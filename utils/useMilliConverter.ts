export const millisToMinutesAndSeconds = (millis :number) => {
    const minutes: number = Math.floor(millis / 60000);
    const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
	//ES6 interpolated literals/template literals 
  	//If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}
    