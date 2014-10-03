
  function parseTwitterDate($stamp) {
    var month=new Array();
    month[0]="Jan";
    month[1]="Feb";
    month[2]="Mar";
    month[3]="Apr";
    month[4]="May";
    month[5]="Jun";
    month[6]="Jul";
    month[7]="Aug";
    month[8]="Sep";
    month[9]="Oct";
    month[10]="Nov";
    month[11]="Dec";


    // convert to local string and remove seconds and year //
    var v=$stamp.split(' ');
    var date=new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));

    // convert to AM or PM //
    var hour = date.getHours();
    var ampm = hour<12 ? ' AM' : ' PM';
    if (hour>12) hour-= 12;
    if (hour==0) hour = 12;
    // return the formatted string //
    return month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + hour + ":" + date.getMinutes() + " " + ampm;
  }
(function ($) {
  // Can also be used with $(document).ready()
  $(window).load(function() {

    // get twitter info
    $.ajaxSetup({ cache: false });
    $.getJSON("/wp-content/themes/stevezeidner/twitter-json.txt", function(data) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
      $(".tweet p").html(data[0].text.replace(exp,"<a href='$1'>$1</a>"));
      $(".avatar").html('<img src="'+data[0].user.profile_image_url.replace('_normal','')+'" />');
      $(".twitter").find(".date").html(parseTwitterDate(data[0].created_at));
    });


    // get the running stats for the home page
    $.getJSON('/wp-content/themes/stevezeidner/runningahead.php', function(data) {
      // put all items into an array
      var items = [];
      $.each(data, function(key, val) {
        items[key] = val;
      });

      // display the yearly miles
      $('.miles').html(items['year']);

      // display a graph of the last 5 runs
      var graph = $(".graph");
      var d1 = [[1, items['latest'][4]], [2, items['latest'][3]], [3, items['latest'][2]], [4, items['latest'][1]], [5, items['latest'][0]]];
      var plot = $.plot(graph, [ d1 ], {
          xaxis: {
            min: 0.8,
            max: 5.2
          },
          yaxis: {
            min: Math.min.apply(Math, items['latest']) - 6,
            max: Math.max.apply(Math, items['latest']) + 6
          },
          series: {
              lines: {
                show: true,
                lineWidth: 3
              },
              points: {
                show: true,
                radius: 5,
                fill: true,
                fillColor: "#333"
              },
              shadowSize: 0,
              highlightColor: "#37b0d4"
          },
          grid: {
              show: false,
              hoverable: true,
              labelMargin: 10
          },
          colors: ["#999"]
      });
      graph.resize();
      var previousPoint = null;
      graph.bind("plothover", function (event, pos, item) {
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY,
                            y + " mi");
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
      });
      function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y - 40,
            left: x - 35,
            padding: '5px',
            color: '#37B0D4',
            opacity: 0.90
        }).appendTo("body").fadeIn(200);
    }
    });
  });

})(jQuery, this);