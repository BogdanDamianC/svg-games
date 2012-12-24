 function CountDown() {
        var startTime = Date.now();
        var totalTimeIntervalSize = 1000;
        var circle = document.getElementById("arc");
        var spanMinutes = $('#tsMinutes');
        var spanSeconds = $('#tsSeconds');
        var gIndicator = $('#Indicator');
        var thisData = this;
        var Running = false;
        var radius = 50;  
        var LastPathInfo = "M100,50 ";
        this.UpdateCircle = function() {
            if(Running === false)
                return;
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
            
            
            if(angle < 270 && Running === true)
            {
                setTimeout(thisData.UpdateCircle,30);
            }
            else
            {
                $(".actions").hide();
            }
        } 
        
        function GetDisplayTimePart(timePart)
        {
            var strTimePart = ''+timePart;            
            return (strTimePart.length > 1?'':'0')+strTimePart;
        }
        
        this.Start = function(minutes, seconds)
        {
            startTime = Date.now();
            totalTimeIntervalSize = (minutes*60+seconds) * 1000;
            $("#runningInfo").show();
            $("#setUPInfo").hide();            
            Running = true;            
            thisData.UpdateCircle();
        }
        
        this.Stop = function()
        {
            Running = false;
            $("#btnStop").hide();
            $("#btnContinue").show();
            thisData.StopTime = Date.now();
        }
        this.Continue = function()
        {
            $("#btnContinue").hide();
            $("#btnStop").show();
            startTime = Date.now() - (thisData.StopTime - startTime);
            Running = true;
            thisData.UpdateCircle();
        }
        
    }