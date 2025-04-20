import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class StudentStatisticsChart extends StatelessWidget {
  final int companiesCameToCollege;
  final int appliedJobs;

  const StudentStatisticsChart({
    super.key,
    required this.companiesCameToCollege,
    required this.appliedJobs,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Statistics'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Student Statistics',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            SizedBox(
              height: 300,
              child: BarChart(
                getBarChartData(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Returns the BarChartData for the chart.
  BarChartData getBarChartData() {
    // Define labels for bottom titles
    List<String> bottomLabels = ['Companies Came to College', 'Jobs Applied'];

    return BarChartData(
      barGroups: _createBarGroups(companiesCameToCollege, appliedJobs),
      borderData: FlBorderData(show: false),
      gridData: const FlGridData(show: false),
      titlesData: FlTitlesData(
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            getTitlesWidget: (value, meta) {
              if (value.toInt() >= 0 && value.toInt() < bottomLabels.length) {
                return Padding(
                  padding: const EdgeInsets.only(top: 8.0),
                  child: Text(
                    bottomLabels[value.toInt()],
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                        fontSize: 12, fontWeight: FontWeight.w500),
                  ),
                );
              }
              return const SizedBox();
            },
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 40,
            getTitlesWidget: (value, meta) {
              return Text(
                value.toInt().toString(),
                style: const TextStyle(fontSize: 12),
              );
            },
          ),
        ),
        topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        rightTitles:
            const AxisTitles(sideTitles: SideTitles(showTitles: false)),
      ),
      barTouchData: BarTouchData(
        touchTooltipData: BarTouchTooltipData(
          getTooltipItem: (group, groupIndex, rod, rodIndex) {
            return BarTooltipItem(
              '${bottomLabels[group.x]}\n',
              const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              children: [
                TextSpan(
                  text: 'Count: ${rod.toY.round()}',
                  style: const TextStyle(color: Colors.white70),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  /// Creates bar groups for the chart.
  List<BarChartGroupData> _createBarGroups(
      int companiesCameToCollege, int appliedJobs) {
    return [
      // Bar for "Companies Came to College"
      BarChartGroupData(
        x: 0,
        barRods: [
          BarChartRodData(
            toY: companiesCameToCollege.toDouble(),
            color: Colors.teal[300],
            width: 30,
            borderRadius: BorderRadius.zero,
          ),
        ],
      ),
      // Bar for "Jobs Applied"
      BarChartGroupData(
        x: 1,
        barRods: [
          BarChartRodData(
            toY: appliedJobs.toDouble(),
            color: Colors.pink[300],
            width: 30,
            borderRadius: BorderRadius.zero,
          ),
        ],
      ),
    ];
  }
}
