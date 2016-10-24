function updateLabel(val) {
	document.getElementById('steps_label').innerHTML = val;
}


RW = {
    current_pos: [500, 250],

    uniform_step: function() {
    	var decision = Math.floor(Math.random() * 4);
    	
    	if (decision == 0 && RW.current_pos[1] >= 15) {
    		RW.current_pos[1] -= 10;

    	} else if (decision == 1 && RW.current_pos[0] <= 985) {
    		RW.current_pos[0] += 10;

    	} else if (decision == 2 && RW.current_pos[1] <= 485) {
    		RW.current_pos[1] += 10;

    	} else if (decision == 3 && RW.current_pos[0] >= 15) {
    		RW.current_pos[0] -= 10;
    	}
    },

    uniform_step_continuous: function() {
    	RW.current_pos[0] += Math.random() * 20 - 10;

    	RW.current_pos[1] += Math.random() * 20 - 10;
    },

	draw: function() {
	    var canvas = document.getElementById("rw_area");
	    var steps = document.getElementById("steps_selector").value;
	    var timeout_interval = Math.round(5000 / steps);
	    RW.current_pos = [500, 250];

	    if (canvas.getContext) {
		    var ctx = canvas.getContext('2d');
		    ctx.clearRect(0, 0, canvas.width, canvas.height);
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
		    ctx.moveTo(this.current_pos[0], RW.current_pos[1]);
		    var i = 0;
		    document.getElementById('status_label').innerHTML = "Generation in progress...";
            function iterate() {
            	setTimeout(function() {
            		RW.uniform_step();
		            ctx.lineTo(RW.current_pos[0], RW.current_pos[1]);
		            ctx.moveTo(RW.current_pos[0], RW.current_pos[1]);
		            ctx.stroke();
		            
		            i++;
		            if (i < steps) {
		            	iterate();
		            }
		            else {
		                document.getElementById('status_label').innerHTML = "Generation completed";
		                ctx.closePath();
		            }
            	}, timeout_interval)
            }	    
		iterate();
		}
	}
}
