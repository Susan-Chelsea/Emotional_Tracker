document.addEventListener('DOMContentLoaded', function () {
    const journals = JSON.parse(stringifiedJournals);
    const emotionNames = ['anger', 'contempt', 'disgust', 'enjoyment', 'fear', 'sadness', 'surprise'];
    const seriesData = emotionNames.map(emotion => journals.map(entry => entry[emotion]));

    const chartData = {
        chart: {
            type: 'line'
        },
        series: emotionNames.map((emotion, index) => ({
            name: emotion,
            data: seriesData[index]
        })),
        xaxis: {
            categories: journals.map(journal => journal.datetime.split('T')[0])
        }
    };

    const chartOptions = {
        series: chartData.series,
        chart: chartData.chart,
        xaxis: chartData.xaxis,
    };

    const chart = new ApexCharts(document.querySelector('#chart'), chartOptions);

    // Render the chart
    chart.render();
});