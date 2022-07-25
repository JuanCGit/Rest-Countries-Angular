
# Rest-Countries-Angular

Angular proyect implementing Rest Countries Api



## Demo

https://restcountries.cloudness.es

## Description

La idea principal era tan solo hacer llamadas a la siguiente Api: https://restcountries.com/v3.1/all, pero tras estar
observándola, vi que sería mejor para organizar y mapear el proyecto una versión anterior: https://restcountries.com/v2/all.

Al hacer esto han surgido ciertas complicaciones puesto que en la v2 por ejemplo no hay Coat Of Arms, 
esto se ha solucionado haciendo una llamada a la api de la version 3.1 pasándole como parámentro
el código numérico del país (https://restcountries.com/v3.1/alpha/'+numericCode).

Todo el proyecto se encuentra en el home.component y los modales estan implementados con la librería de SweetAlert2 (Tanto el modal de Coat Of Arms como los inputs).

Para posibilitar el filtrado por búsqueda, he generado dos Arrays de tipo country, el original 'countries' (donde se hace la llamada a la api) y el que se muestra todo el rato en función de los parámetros de busqueda 'filteredCountries'.

Respecto a todo lo relacionado con el diseño del proyecto he utilizado la librería de estilos de Angular Material y scss para ciertos estilos.


## Screenshots

![App Screenshot](https://restcountries.cloudness.es/restHome.png)

![App Screenshot](https://restcountries.cloudness.es/restEdit.png)

![App Screenshot](https://restcountries.cloudness.es/restCoat.png)


