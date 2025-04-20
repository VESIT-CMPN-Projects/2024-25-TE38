import 'package:app/pages/Auth/login_screen.dart';
import 'package:app/pages/Dashboard/home_screen.dart';
import 'package:app/pages/Dashboard/jobs_screen.dart';
import 'package:app/pages/Dashboard/profile_screen.dart';
import 'package:app/pages/Dashboard/settings_screen.dart';
import 'package:app/store/auth_provider.dart';

import 'package:flutter/material.dart';

import 'package:provider/provider.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  final List<Widget> _page = [
    const HomeScreen(),
    const JobsScreen(),
    const ProfileScreen(),
    const SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              final loginProvider =
                  Provider.of<LoginProvider>(context, listen: false);
              // Sign out logic
              loginProvider.signOut();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
            tooltip: 'Sign Out',
          ),
        ],
      ),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.6,
        child: ListView(
          children: [
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () {
                Navigator.pushNamed(context, '/home');
              },
            ),
            ListTile(
              leading: const Icon(Icons.badge),
              title: const Text('Jobs'),
              onTap: () {
                Navigator.pushNamed(context, '/jobs');
              },
            ),
            ListTile(
              leading: const Icon(Icons.account_circle),
              title: const Text('Profile'),
              onTap: () {
                Navigator.pushNamed(context, '/profile');
              },
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              onTap: () {
                Navigator.pushNamed(context, '/settings');
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: _onItemTapped,
        animationDuration: const Duration(milliseconds: 800),
        height: 60,
        indicatorColor: Colors.blue,
        indicatorShape: const CircleBorder(),
        destinations: [
          NavigationDestination(
            icon: Icon(
              Icons.home_outlined,
              color: _selectedIndex == 0 ? Colors.white : Colors.grey[700],
            ),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.badge_outlined,
              color: _selectedIndex == 1 ? Colors.white : Colors.grey[700],
            ),
            label: 'Jobs',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.account_circle_outlined,
              color: _selectedIndex == 2 ? Colors.white : Colors.grey[700],
            ),
            label: 'Profile',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.settings_outlined,
              color: _selectedIndex == 3 ? Colors.white : Colors.grey[700],
            ),
            label: 'Settings',
          ),
        ],
      ),
      body: _page[_selectedIndex],
    );
  }
}
