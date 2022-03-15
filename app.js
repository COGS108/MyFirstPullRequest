function assignment2(){
    var filePath="cleanData.csv";
    question1(filePath);
    question2(filePath);
    question3(filePath);
    question4(filePath);
    question5(filePath);
}

//Question 1
var question1=function(filePath){

    var rowConverter = function(d){
        return {
            Start_Time: d.Start_Time,
            Accident: d.ID
        };
    }

    const data = d3.csv(filePath, rowConverter);


    data.then(function(data) {

        var parseTime = d3.timeParse("%Y");

        var data = data.map(function(d) {
          return {
            Hour: parseInt(d.Start_Time.match(/(?<![\d]{4}[-][\d]{2}[-]\d]{2}) \d\d/)[0]),//parseInt(d.Start_Time.match(/(?<![\d]{4}-)-(\d\d)(?=[-\d])/)[0].replace('-', '')),//parseInt(d.Start_Time.match(/(?<![\d]{4}[-][\d]{2}[-]\d]{2}) \d\d/)[0]),
            Year:  parseInt(d.Start_Time.match(/.{0,4}/)[0]),
            Accident: d.Accident
          }
        });
        //console.log(data)


        years = [2016,2017,2018,2019,2020,2021]
        hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] // [1,2,3,4,5,6,7,8,9,10,11,12]//

        let rollup = d3.rollups(data, v => v.length, d => d.Year, d => d.Hour)
        let fm = [...rollup].flatMap(([k1, v1]) => [...v1].map(([k2, v2]) => ({Year: k1, Hour: k2, Count: v2})))
         
        console.log(fm)

        var yr;
        var hr;
        var s;
        var g ;
        var max = 0;
        var min = 9999;
        let yrs = Array.from(d3.group(fm, d => d.Year).keys()).sort();
        var medals = new Array();
        for (let j = 0; j < yrs.length; j++){
            for (let i = 0; i < fm.length; i++){
                for (let k = 0; k < hour.length; k++)
                    if (yrs[j] == fm[i].Year && hour[k] == fm[i].Hour ) {
                        yr = yrs[j]
                        hr = hour[k] 
                        val = fm[i].Count
                        if (val > max){
                            max = val
                        }
                        if (val < min){
                            min = val
                        }
                        medals.push({Year:yr, Hour:hr,  val:val})      
                }
            }
                                
        } 
        medals = medals.sort(function(a,b) {return d3.ascending(a.Year,b.Year);});
        console.log(medals)

        var margin = {top: 80, right: 25, bottom: 30, left: 100},
        width = 1000 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#q1_plot")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([1,max])

    var Tooltip = d3.select("#q4_plot").append("div").style("opacity", 0).attr("class", "tooltip");
               
    var x = d3.scaleBand()
              .range([ 0, width ])
              .domain(hour)
              .padding(0.05);

    svg.append("g")
        .style("font-size", 12)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    var y = d3.scaleBand()
                .range([ height, 0 ])
                .domain(years)
                .padding(0.05);

              svg.append("g")
                .style("font-size", 12)
                .call(d3.axisLeft(y).tickSize(0))
                .select(".domain").remove()


    svg.selectAll()
        .data(medals, function(d) {return d.group+':'+d.variable;})
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.Hour) })
          .attr("y", function(d) { return y(d.Year) })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("width", x.bandwidth() )
          .attr("height", y.bandwidth() )
          .style("fill", function(d) { return myColor(d.val)} )
          .style("stroke-width", 4)
          .style("stroke", "none")
          .style("opacity", 0.8)
        .on('mouseover', function(event, d){
            d3.select(this).style("stroke", "grey")
            Tooltip.style("visibility", "visible")
            Tooltip.html(d.val.toLocaleString('en-US')).style('left', event.pageX + 'px').style('top', event.pageY + 'px')
        })
        .on('mousemove', function(event, d){
            Tooltip.transition().duration(1).style('opacity', 0.8)//.transition().duration(100)
            Tooltip.html(d.val.toLocaleString('en-US')).style('left', event.pageX + 'px').style('top', event.pageY + 'px').style('opacity', 1)
        })
        .on('mouseout', function(d){
            d3.select(this).style("stroke", "none")
            Tooltip.style("visibility", "hidden")
        })



        // ADD X AND Y AXIS TITLES
        svg.append("text")
            .attr("class", "x_label")
            .attr("text-anchor", "middle")
            .attr("x", width/2 )
            .attr("y", height )
            .attr("dy", "1.95em")
            .text("Hour of Day").attr("font-family", "sans-serif").attr("font-size", "15px").attr("font-weight", "bold").attr("fill", "black");

        svg.append("text")
            .attr("class", "y_yabel")
            .attr("text-anchor", "end")
            .attr("x", -height/2 )
            .attr("y",-50)
            .attr("dy", "0.5em")
            .attr("dx", "1em")
            .attr("transform", "rotate(-90)")
            .text("Year").attr("font-family", "sans-serif").attr("font-size", "15px").attr("font-weight", "bold").attr("fill", "black");

    })

    
}

var question2=function(filePath){

    var rowConverter = function(d){
        return {
            Start_Time: d.Start_Time,
            Accident: d.ID
        };
    }

    const data = d3.csv(filePath, rowConverter);
    data.then(function(data){
        console.log(data);
    });

    data.then(function(data) {

        var parseTime = d3.timeParse("%Y");

        var data = data.map(function(d) {
          return {
            Month: parseInt(d.Start_Time.match(/(?<![\d]{4}-)-(\d\d)(?=[-\d])/)[0].replace('-', '')),
            Year:  parseInt(d.Start_Time.match(/.{0,4}/)[0]),
            Accident: d.Accident
          }
        });
        console.log(data)

        let rollup = d3.rollups(data, v => v.length, d => d.Year, d => d.Month)
        let fm = [...rollup].flatMap(([k1, v1]) => [...v1].map(([k2, v2]) => ({Year: k1, Month: k2, Count: v2})))
        let fm2 = fm.sort(function(a,b) {return d3.ascending(a.Month,b.Month);})
        console.log(fm2)

        fm3= d3.group(fm2, d => d.Year)

        console.log(fm3)

        // columnsToSum = ['Month']

        // var groupedData = d3.rollup(fm,
        //           v => d3.count(v, d => d.Month),
        //           d => d.Year)

        // console.log(groupedData) 

        // var allGroup = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        // var max = 0
        // var df = new Array();
        // for (let i = 0; i < allGroup.length; i ++){
        //     var temp = Math.max(groupedData.get(allGroup[i]).NA_Sales, groupedData.get(allGroup[i]).EU_Sales,
        //         groupedData.get(allGroup[i]).JP_Sales, groupedData.get(allGroup[i]).Other_Sales)
        //     if (temp > max){
        //         max = temp;
        //     }
        //      df.push({Year:allGroup[i],NA_Sales: groupedData.get(allGroup[i]).NA_Sales,
        //              EU_Sales:groupedData.get(allGroup[i]).EU_Sales,
        //              JP_Sales:groupedData.get(allGroup[i]).JP_Sales,
        //              Other_Sales: groupedData.get(allGroup[i]).Other_Sales })
        // }
        // console.log(df)

         var getDots=function(data){

            d3.select('#q2_plot').select('svg').remove()

            console.log(data)

            // var allGroup = [2011, 2012, 2013, 2014, 2015]

            // BAR PLOT
            var svgwidth = 500;
            var svgheight = 500;
            var padding = 70;

            var svg = d3.select("#q2_plot").append("svg")
                    .attr("width", svgwidth + padding)
                    .attr("height", svgheight + padding).append("g")
                    .attr("transform", "translate(" + padding + ",0)");

            // var xScale = d3.scaleBand()//                           .domain(d3.extent(data,d=>d.Month))
            //                .range([ 0, svgwidth-padding  ])
            //                .domain(data.map(function(d) { return d.Month;}));

            var formatxAxis = d3.format('.0f');

            var xScale = d3.scaleTime()
                           .domain(d3.extent(data,d=>d.Month))
                           .range([ 0, svgwidth-padding  ]);

            svg.append("g")
               .attr("transform", "translate(0," + svgheight + ")")
               .call(d3.axisBottom(xScale).tickFormat(formatxAxis).ticks(12))

            var yScale = d3.scaleLinear()
                           .domain([0,
                              d3.max(data, function(d){return d.Count;}) + padding*125])//d3.max(d.Count)+padding/3])
                           .range([svgheight,0]);

            svg.append("g").call(d3.axisLeft(yScale));

            var Tooltip = d3.select("#q3_plot").append("div").style("opacity", 0).attr("class", "tooltip");
           
            svg.append('g').selectAll(".q3circle")
                .data(data).enter().append("circle")
                .attr("cx", function(d,i){
                    return xScale(d.Month);
                })
                .attr("cy", function(d){
                    return yScale(d.Count);
                })
                .attr("r", 5)
                .attr("fill", 'blue')
                .on('mouseover', function(event, d){
                    d3.select(this).attr("stroke-width", 2).style("stroke", "grey")
                    Tooltip.style("visibility", "visible")
                    Tooltip.html(d.Count).style('left', event.pageX + 'px').style('top', event.pageY + 'px')                
                })
                .on('mousemove', function(event, d){
                    Tooltip.transition().duration(1).style('opacity', 0.8)
                    Tooltip.html(d.Count).style('left', event.pageX + 'px').style('top', event.pageY + 'px').style('opacity', 1)
                })
                .on('mouseout', function(d){
                    d3.select(this).style("stroke", "none")
                    Tooltip.style("visibility", "hidden")
                })

            svg.append('path').datum(data)
                              .attr("fill", "none")
                              .attr("stroke", 'blue')
                              .attr("stroke-width", 1.5)
                              .attr("d", d3.line()
                                            .x(function(d) { return xScale(d.Month)})
                                            .y(function(d) { return yScale(d.Count) })
                                    )

            // ADD X AND Y AXIS TITLES
            svg.append("text")
                .attr("class", "x_label")
                .attr("text-anchor", "middle")
                .attr("x", svgwidth/2 - padding/2)
                .attr("y", svgheight )
                .attr("dy", "2.35em")
                .text("Month").attr("font-family", "sans-serif").attr("font-size", "13px").attr("font-weight", "bold").attr("fill", "black");

            svg.append("text")
                .attr("class", "y_yabel")
                .attr("text-anchor", "end")
                .attr("x", -svgheight/2 )
                .attr("y",-padding)
                .attr("dy", "1.5em")
                .attr("dx", "3em")
                .attr("transform", "rotate(-90)")
                .text("Number of Accidents").attr("font-family", "sans-serif").attr("font-size", "13px").attr("font-weight", "bold").attr("fill", "black");

        }


        // console.log(fm3.get(2016))
       getDots(fm3.get(2016),2016)
        d3.select("#radio").attr('name','year').on("change",d=>{
            console.log(d.target.value);
            var year = parseInt(d.target.value)
            getDots(fm3.get(year),year)
            console.log(fm3.get(year))
        })

    });

    
    
}

var question3=function(filePath){


    var rowConverter = function(d){
        return {
            Start_Time: d.Start_Time,
            Accident: d.ID
        };
    }

    const data = d3.csv(filePath, rowConverter);
    data.then(function(data){
        console.log(data);
    });

    data.then(function(data) {




    var getBars=function(data, str){

        d3.select('#q3_plot').select('svg').remove()

        if (str == 'Year'){
            var data = data.map(function(d) {
              return {
                time:  parseInt(d.Start_Time.match(/.{0,4}/)[0]),
               // Month: parseInt(d.Start_Time.match(/(?<![\d]{4}-)-(\d\d)(?=[-\d])/)[0].replace('-', '')),
                Accident: d.Accident
              }
            });
        } else if (str == 'Month'){
            var data = data.map(function(d) {
              return {
                //Year:  parseInt(d.Start_Time.match(/.{0,4}/)[0]),
                time: parseInt(d.Start_Time.match(/(?<![\d]{4}-)-(\d\d)(?=[-\d])/)[0].replace('-', '')),
                Accident: d.Accident
              }
            });
        } else if (str == 'Hour'){
            var data = data.map(function(d) {
              return {
                time: parseInt(d.Start_Time.match(/(?<![\d]{4}[-][\d]{2}[-]\d]{2}) \d\d/)[0]),
                //Year:  parseInt(d.Start_Time.match(/.{0,4}/)[0]),
                //Month: parseInt(d.Start_Time.match(/(?<![\d]{4}-)-(\d\d)(?=[-\d])/)[0].replace('-', '')),
                Accident: d.Accident
              }
        });
        }
        console.log(data)
        
        // Participation value counts for each year for Females After 1980
        var val_cnts = d3.rollups(data,
                                  xs => d3.count(xs, x => x.time),
                                  d => d.time
                                 ).map(([k, v]) => ({ time: k, Count: v })).sort(function(a,b) {return d3.ascending(a.time,b.time);});

        console.log(val_cnts);


        console.log(val_cnts);

        // BAR PLOT
        var svgwidth = 500;
        var svgheight = 500;
        var padding = 70;

        var svg = d3.select("#q3_plot").append("svg")
                    .attr("width", svgwidth + padding)
                    .attr("height", svgheight + padding).append("g")
                    .attr("transform", "translate(" + padding + ",0)");

        // X axis
        var xScale = d3.scaleBand()
                       .range([ 0, svgwidth - padding])
                       .domain(val_cnts.map(function(d) { return d.time;})).padding(0.2);

        svg.append("g")
           .attr("transform", "translate(0," + svgheight + ")")
           .call(d3.axisBottom(xScale))

        // Y axis
        var yScale = d3.scaleLinear()
                       .domain([0,
                                d3.max(val_cnts, function(d){return d.Count;})+ padding*100])
                       .range([svgheight,0]);
        
        svg.append("g").call(d3.axisLeft(yScale));

        // Bars
        svg.selectAll("mybar")
           .data(val_cnts)
           .enter()
           .append("rect")
           .attr("x", function(d) { return xScale(d.time);})
           .attr("y", function(d) { return yScale(d.Count);})
           .attr("width", xScale.bandwidth())
           .attr("height", function(d) { return svgheight - yScale(d.Count); })
           .attr("fill", 'red');

                    // ADD X AND Y AXIS TITLES
            svg.append("text")
                .attr("class", "x_label")
                .attr("text-anchor", "middle")
                .attr("x", svgwidth/2 - padding/2)
                .attr("y", svgheight )
                .attr("dy", "2.35em")
                .text(str).attr("font-family", "sans-serif").attr("font-size", "13px").attr("font-weight", "bold").attr("fill", "black");

            svg.append("text")
                .attr("class", "y_yabel")
                .attr("text-anchor", "end")
                .attr("x", -svgheight/2 )
                .attr("y",-padding)
                .attr("dy", "1.5em")
                .attr("dx", "3em")
                .attr("transform", "rotate(-90)")
                .text("Number of Accidents").attr("font-family", "sans-serif").attr("font-size", "13px").attr("font-weight", "bold").attr("fill", "black");
        }

                // console.log(fm3.get(2016))
       getBars(data, 'Year')
        d3.select("#radio_q3").attr('name','time').on("change",d=>{
            console.log(d.target.value);
            var year = d.target.value
            getBars(data, year)
            console.log(year)
        })

    })

    
}

var question4=function(filePath){
   
}


var question5=function(filePath){


}


function plot() {
    var filePath = 'cleanData.csv'
    const csv = d3.csv(filePath)
    console.log('hd')
    csv.then(function (data) {
        console.log(data)
        console.log('hi')
    })
}