/**
 * Created by mponomarets on 3/31/17.
 */
import {START_REQUEST} from './types';

export const getData=()=>{
	let url='http://api.openweathermap.org/data/2.5/'+'forecast?q=kiev'+'&appid=6bcfc50c216f92e57c5de18d5eb123a6'+'&units=metric';
	return dispatch=>fetch(url)
		.then((res)=>console.log(res));
}
