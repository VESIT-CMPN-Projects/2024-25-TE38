import 'package:app/pages/Auth/login_screen.dart';
import 'package:app/pages/Dashboard/dashboard_screen.dart';
import 'package:app/store/auth_provider.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:app/firebase_options.dart';
import 'package:provider/provider.dart';

const BackendUrl = "http://192.168.29.234:8080";

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(
    ChangeNotifierProvider(
      create: (context) =>
          LoginProvider(), // Provide LoginProvider to the entire app
      child: const App(),
    ),
  );
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  User? _user;
  String _accessToken = "";

  @override
  void initState() {
    super.initState();

    FirebaseAuth.instance.authStateChanges().listen((user) async {
      if (user != null) {
        final token = await user.getIdToken();
        setState(() {
          _user = user;
          _accessToken = token ?? "";
        });

        // Set user and token in the LoginProvider
        final loginProvider =
            Provider.of<LoginProvider>(context, listen: false);
        loginProvider.setUser(user);
        loginProvider.setAccessToken(token ?? "");
      } else {
        setState(() {
          _user = null;
          _accessToken = "";
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: _user != null ? const DashboardScreen() : const LoginScreen(),
    );
  }
}
