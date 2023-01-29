export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ServerWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ServerForecast {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ServerWeatherAndForecast {
  current: ServerWeather;
  forecast: ServerForecast[];
}

//// CUSTOM ////
export interface IWeather {
  city: ICity;
  temp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  pressure: number;
  humidity: number;
  summary: string;
  description: string;
  windSpeed: number;
  icon: string;
}

export interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number;
    long: number;
  };
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IForecast {
  forecastDateTime: number;
  dateTimeText: string;
  temp: number;
  feelsLike: number;
  icon: string;
}

export interface IWeatherAndForecast {
  current: IWeather;
  forecast: IForecast[];
}
