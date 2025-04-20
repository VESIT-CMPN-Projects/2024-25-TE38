import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class LoginProvider extends ChangeNotifier {
  User? _user;
  String _accessToken = "";

  User? get user => _user;
  String get accessToken => _accessToken;

  void setAccessToken(String token) {
    _accessToken = token;
    notifyListeners();
  }

  void setUser(User? user) {
    _user = user;
    notifyListeners();
  }

  void signOut() {
    _accessToken = "";
    _user = null;
    notifyListeners();
  }
}
