 function CountDown(secondstotheEnd) {
        var startTime = Date.now();
        var endTime = new Date().setSeconds(startTime + secondstotheEnd) 
        var totalTimeIntervalSize = secondstotheEnd * 1000;
        var circle = document.getElementById("arc");
        var spanMinutes = $('#tsMinutes');
        var spanSeconds = $('#tsSeconds');
        var gIndicator = $('#Indicator');
        
        var radius = 50;  
        var LastPathInfo = circle.getAttribute("d");
        this.UpdateCircle = function() {
            var angle = -90;
            var currentTimeDiff = Date.now() - startTime;
            if(currentTimeDiff > totalTimeIntervalSize)
            {
                angle = 270;
                spanMinutes.text('00');
                spanSeconds.text('00');
            }
            else
            {
                angle += currentTimeDiff*360/totalTimeIntervalSize;
                currentTimeDiff = totalTimeIntervalSize - currentTimeDiff;
                var totalMinutes = Math.floor(currentTimeDiff/60000);
                var totalSeconds = Math.floor((currentTimeDiff-(totalMinutes*60000))/1000);
                spanMinutes.text(GetDisplayTimePart(totalMinutes));
                spanSeconds.text(GetDisplayTimePart(totalSeconds));                
            }
            var radians= (angle/180) * Math.PI;
            var x = 100 + Math.cos(radians) * radius;
            var y = 100 + Math.sin(radians) * radius;          
            LastPathInfo = LastPathInfo+ " L "+x + " " + y;            
            circle.setAttribute("d", LastPathInfo + " L 100, 100 z");
            gIndicator.attr('transform', 'translate('+x+","+y +") rotate("+(angle+90) +")");
            
            
            if(angle < 270)
                setTimeout(this.UpdateCircle,50)
            
        } 
        
        function GetDisplayTimePart(timePart)
        {
            var strTimePart = ''+timePart;            
            return (strTimePart.length > 1?'':'0')+strTimePart;
        }
        this.UpdateCircle();
    }