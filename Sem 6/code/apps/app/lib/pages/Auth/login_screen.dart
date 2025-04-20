import 'package:app/main.dart';
import 'package:app/pages/Dashboard/dashboard_screen.dart';
import 'package:app/store/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  User? _user; // Track the signed-in user
  String _accessToken = "";

  @override
  void initState() {
    super.initState();
    FirebaseAuth.instance.authStateChanges().listen((user) {
      setState(() {
        _user = user;
      });
    });
  }

  Future<void> _signInWithGoogle() async {
    try {
      await GoogleSignIn().signOut();
      await FirebaseAuth.instance.signOut();
      final googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) return;

      final googleAuth = await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);

      String idToken = await userCredential.user?.getIdToken(true) ?? "";

      Provider.of<LoginProvider>(context, listen: false)
          .setUser(userCredential.user);
      Provider.of<LoginProvider>(context, listen: false)
          .setAccessToken(idToken);

      _user = userCredential.user;
      _accessToken = idToken;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Welcome, ${_user?.displayName ?? "User"}!")),
      );

      Navigator.pushReplacement(context, MaterialPageRoute(
        builder: (context) {
          return const DashboardScreen();
        },
      ));

      // Send the token to backend
      final response = await http.post(
        Uri.parse("$BackendUrl/api/student/google_login"),
        headers: {"Authorization": "Bearer $_accessToken"},
      );

      print("Backend Response: ${response.body}");
    } catch (e) {
      print("Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Sign-in failed: $e")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 150),
          Image.asset("assets/PlaceNext_logo.png", width: 300, height: 300),
          const Text(
            "PlaceNext",
            style: TextStyle(
              color: Color(0xFF06AED5),
              fontSize: 45,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 50),
          FilledButton(
            style: ButtonStyle(
              backgroundColor:
                  WidgetStateProperty.all<Color>(const Color(0xFF30D9FF)),
              padding: WidgetStateProperty.all<EdgeInsets>(
                const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              ),
            ),
            onPressed: _signInWithGoogle,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset("assets/google_logo.png", width: 40, height: 40),
                const SizedBox(width: 10),
                const Text(
                  "Sign in with Google",
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 20,
                      fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
