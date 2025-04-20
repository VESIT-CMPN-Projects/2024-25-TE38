import 'dart:async';

import 'package:app/pages/Dashboard/dashboard_screen.dart';
import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(milliseconds: 1500), () {
      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (context) => const DashboardScreen()));
    });
  }

  @override
  Widget build(BuildContext context) {
    // Get full screen dimensions
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Container(
        height: screenHeight,
        width: screenWidth,
        color: Colors.white, // Background color
        child: Stack(
          children: [
            // Top-left circle
            Positioned(
              top: -screenWidth * 0.5, // Dynamic positioning
              left: -screenWidth * 0.5,
              child: Container(
                width: screenWidth, // Make circles responsive
                height: screenWidth,
                decoration: const BoxDecoration(
                  color: Color(0xFF06AED5), // Blue color
                  shape: BoxShape.circle,
                ),
              ),
            ),
            // Bottom-right circle
            Positioned(
              bottom: -screenWidth * 0.5,
              right: -screenWidth * 0.5,
              child: Container(
                width: screenWidth,
                height: screenWidth,
                decoration: const BoxDecoration(
                  color: Color(0xFF06AED5),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            // Center content
            Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/PlaceNext_logo.png',
                    width: 83,
                    height: 86,
                  ),
                  const SizedBox(width: 8), // Space between logo and text
                  const Text(
                    "PlaceNext",
                    style: TextStyle(
                      color: Color(0xFF06AED5),
                      fontSize: 60,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
