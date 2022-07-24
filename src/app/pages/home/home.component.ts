import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../services/country.service";
import {country} from "../../interfaces/country";
import {CoatOfArms} from "../../interfaces/coat-of-arms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countries: country[] = [];
  filteredCountries: country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
      for (let i = 0; i < this.countries.length; i++) {
        this.countries[i].location = 'https://maps.google.com?q=' + this.countries[i].name
      }
      this.filteredCountries = this.countries
      console.log(this.countries);
    });
  }

  getCoatOfArms(numericCode: string){
    for (let i = 0; i < this.filteredCountries.length; i++) {
      if(this.filteredCountries[i].numericCode == numericCode && numericCode.includes("nw-")) {
        Swal.fire({
          imageUrl: this.filteredCountries[i].coatOfArms.png
        })
      }
    }
    this.countryService.getCoatOfArms(numericCode).subscribe((coatOfArms) => {
      if (!coatOfArms[0].coatOfArms.png) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There is no Coat Of Arms',
        })
      } else {
        Swal.fire({
          imageUrl: coatOfArms[0].coatOfArms.png
        })
      }
    })
  }

  searchCountries(){
    (async () => {
      const { value: filter } = await Swal.fire({
        title: 'What do you want to search?',
        input: 'text',
        inputPlaceholder: 'Your search'
      })
      if (filter) {
        this.filteredCountries=[]
        for (let i = 0; i < this.countries.length; i++){
          if(this.countries[i].name.toLowerCase().includes(filter.toLowerCase())){
            this.filteredCountries.push(this.countries[i])
          }
        }
      }
    })()
  }

  deleteCountry(numeriCode: string) {
    for (let i = 0; i < this.filteredCountries.length; i++){
      if(this.filteredCountries[i].numericCode == numeriCode) {
        this.filteredCountries.splice(i, 1)
      }
    }
  }

  createCountry() {
    (async () => {
      const { value: newName } = await Swal.fire({
        title: 'Name of the country',
        input: 'text',
        inputPlaceholder: 'Name'
      })

      const { value: newPopulation} = await Swal.fire({
        title: 'Population of the country',
        input: 'number',
        inputPlaceholder: 'Population'
      })

      const { value: flag } = await Swal.fire({
        title: 'Flag of the country',
        input: 'url',
        inputPlaceholder: 'Flag url'
      })
      let newFlag: {png: string, svg: string} = {png: "", svg: ""};
      newFlag.png = flag;

      const { value: newCoatOfArms } = await Swal.fire({
        title: 'Coat of Arms of the country',
        input: 'url',
        inputPlaceholder: 'Coat of Arms url'
      })

      const { value: languages } = await Swal.fire({
        title: 'Languages of the country',
        input: 'text',
        inputPlaceholder: 'Languages divided by ,'
      })
      let arrayLanguages = languages.split(",");
      let newLanguages: {name: string}[] = [];
      for(let i=0; i < arrayLanguages.length; i++){
        newLanguages[i] = {name: arrayLanguages[i]}
      }
      console.log((newLanguages));

      const { value: numericCode} = await Swal.fire({
        title: 'Numeric code of the country',
        input: 'number',
        inputPlaceholder: 'Numeric code'
      })
      let newNumericCode = "nw-"+numericCode;

      const { value: newLocation } = await Swal.fire({
        title: 'Location of the country',
        input: 'url',
        inputPlaceholder: 'Url of google maps of the Country'
      })

      let newCountry: country = {
        name: newName,
        population: newPopulation,
        languages: newLanguages,
        flags: newFlag,
        location: newLocation,
        numericCode: newNumericCode,
        coatOfArms: {png: newCoatOfArms}
      };

      this.filteredCountries.push(newCountry)

    })()
  }

  resetSearch(){
    this.filteredCountries=this.countries
  }

  editCountry(numericCode: string, countryName: string){
    let positionArray: number = 0;

    for (let i = 0; i < this.filteredCountries.length; i++){
      if(this.filteredCountries[i].numericCode == numericCode){
        positionArray = i;
      }
    }

    (async () => {
      const { value: name } = await Swal.fire({
        title: 'You are editing ' + countryName + ' name',
        input: 'text',
        inputValue: countryName
      })
      if (name) {
        this.filteredCountries[positionArray].name = name;
      }

      const { value: population } = await Swal.fire({
        title: 'You are editing '+ this.filteredCountries[positionArray].name + ' population',
        input: 'number',
        inputValue: this.filteredCountries[positionArray].population
      })
      if (population) {
        this.filteredCountries[positionArray].population = population;
      }

      const { value: flag } = await Swal.fire({
        title: 'You are editing '+ this.filteredCountries[positionArray].name + ' flag',
        input: 'url',
        inputValue: this.filteredCountries[positionArray].flags.png
      })
      if (flag) {
        this.filteredCountries[positionArray].flags.png = flag;
      }

      if(name && population && flag){
        Swal.fire({
          icon: 'success',
          title: 'Country modified succesfully',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
      }else if(!name || !population || !flag){
        Swal.fire({
          icon: 'error',
          title: "You can't leave empty any field",
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: "Something went wrong",
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
      }
    })()
  }
}
