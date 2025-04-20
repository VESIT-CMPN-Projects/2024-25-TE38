import 'dart:convert';

import 'package:app/main.dart';
import 'package:app/store/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

class DepartmentwiseStats extends StatefulWidget {
  const DepartmentwiseStats({super.key});

  @override
  State<DepartmentwiseStats> createState() => _DepartmentwiseStatsState();
}

class _DepartmentwiseStatsState extends State<DepartmentwiseStats> {
  String? _dropDownValue; // For selected year
  late String _accessToken;
  Map<String, dynamic> _response = {};
  List<DropdownMenuItem<String>> items = []; // Dropdown items

  @override
  void initState() {
    super.initState();
    _accessToken =
        Provider.of<LoginProvider>(context, listen: false).accessToken;
    _getResponses();
  }

  void _getResponses() async {
    final response = await http.get(
      Uri.parse('$BackendUrl/api/college/get_department_statistics'),
      headers: {
        'Authorization': 'Bearer $_accessToken',
      },
    );

    print(response.body);

    if (response.statusCode == 200) {
      setState(() {
        _response = jsonDecode(response.body);
        print(_response['years']);
        items = (_response['years'] as List<dynamic>).map((year) {
          return DropdownMenuItem<String>(
            value: year.toString(),
            child: Text(year.toString()),
          );
        }).toList();
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error: Failed to fetch statistics')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Dropdown to select year
            DropdownButton<String>(
              value: _dropDownValue,
              items: items,
              onChanged: (value) {
                setState(() {
                  _dropDownValue = value;
                });
              },
              isExpanded: true,
              hint: const Text('Select Year'),
            ),
            const SizedBox(height: 20),

            // Display department-wise statistics
            if (_dropDownValue != null && _response['departments'] != null) ...[
              Column(
                children:
                    (_response['departments'] as Map).entries.map((entry) {
                  final department = entry.key;
                  final stats = entry.value as Map<String, dynamic>;

                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      title: Text(department),
                      subtitle: Text(
                        'Placed: ${stats['placed']}, Not Placed: ${stats['notPlaced']}',
                      ),
                    ),
                  );
                }).toList(),
              ),
            ] else ...[
              const Center(child: Text('No data available for selected year')),
            ],
          ],
        ),
      ),
    );
  }
}
