
function AI(){
	if (scene === "GO" && play === true){
		if (human){
			radar();
		} else {
			if (millis()-goTime>3000){
				training();
			}
		}
	}
}