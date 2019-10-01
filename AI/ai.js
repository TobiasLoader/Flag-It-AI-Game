
function AI(){
	if (scene === "GO" && play === true){
		if (human){
			radar();
		} else {
			training();
		}
	}
}