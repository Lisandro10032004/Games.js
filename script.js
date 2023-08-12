const container = document.querySelector(".container");
const btnInicio = document.querySelector(".inicio");
const puntuacionContainer = document.querySelector(".puntuacion");
const puntuacionMaxContainer = document.querySelector(".puntuacion-max");

let click = "click";
let selectPosition = 0;
let tiempoInicio = 1000;
let puntuacion = 0;
let puntuacionMax = 0;
let select = 0;
let cantidadArray = 4;

let arrayNumeros = [];

for (let i = 1; i < 10; i++) {
  container.innerHTML += `<input type="submit" class="box" value=" " id="${i}">`;
}

const llenarArray = () => {
  arrayNumeros = [];
  while (arrayNumeros.length < cantidadArray) {
    let numeroRandom = Math.round(Math.random() * 9);
    if (arrayNumeros.includes(numeroRandom) || numeroRandom < 1) {
      console.log("repetido");
    } else {
      arrayNumeros.push(numeroRandom);
    }
  }
};

const boxSelect = document.querySelectorAll(".box");

const darNumeros = () => {
  boxSelect.forEach((box) => {
    if (box.id == arrayNumeros[selectPosition]) {
      box.value = selectPosition + 1;
      selectPosition++;
    }
  });
};

const mostrar = () => {
  setTimeout(() => {
    boxSelect.forEach((box) => {
      darNumeros();
      setTimeout(() => {
        box.value = " ";
      }, tiempoInicio);
    });
  }, 200);
};

const iniciar = () => {
  boxSelect.forEach((box) => {
    box.addEventListener(click, (e) => {
      if (box.id == arrayNumeros[select]) {
        box.classList += " correct";
        select++;
        puntuacion = puntuacion + 50;
        puntuacionContainer.innerHTML = `<b class ="puntuacion">Puntuación: ${puntuacion}</b>`;
        if (puntuacion > puntuacionMax) {
          puntuacionMax = puntuacion;
          puntuacionMaxContainer.innerHTML = `<b class ="puntuacion">Puntuación: ${puntuacionMax}</b>`;
        }

        if (select >= cantidadArray) {
          iluminar("correct");

          setTimeout(() => {
            reiniciar();
            ejecutarTodo();
          }, 100);
          click = "mondongo";
          if (puntuacion > 1000) {
            aumentarDificultad();
          }
          if (puntuacion > 5000) {
            aumentarDificultadx1000();
          }
        }
      } else {
        click = "mondongo";
        if (puntuacion >= puntuacionMax) {
          puntuacionMax = puntuacion;
          puntuacionMaxContainer.innerHTML = `<b class ="puntuacion ">Puntuación máxima: ${puntuacionMax}</b>`;
        }
        puntuacion = 0;
        cantidadArray = 4;
        iluminar("incorrect");
        puntuacionContainer.innerHTML = `<b class ="puntuacion">Puntuación: ${puntuacion}</b>`;
        reiniciar();
        e.preventDefault();
        btnInicio.value = "Reintentar";
        setTimeout(() => {
          btnInicio.classList.remove("d-none");
        }, tiempoInicio);
      }
    });
  });
};

const reiniciar = () => {
  selectPosition = 0;
  select = 0;
  arrayNumeros = 4;
  setTimeout(() => {
    boxSelect.forEach((element) => {
      element.classList.remove("correct");
      element.classList.remove("incorrect");
    });
  }, 200);
};

const ejecutarTodo = () => {
  llenarArray();
  mostrar();
  iniciar();
};

btnInicio.addEventListener("click", () => {
  ejecutarTodo();
  btnInicio.classList += " d-none";
});

const aumentarDificultad = () => {
  cantidadArray = 6;
};

const aumentarDificultadx1000 = () => {
  cantidadArray = 9;
};

const iluminar = (color) => {
  boxSelect.forEach((box) => {
    box.classList += ` ${color}`;
  });
};

