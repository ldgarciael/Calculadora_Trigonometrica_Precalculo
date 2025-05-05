// Variables globales
let catetoA = 0;
let catetoB = 0;
let catetoOtro = 0;
let hipotenusa = 0;
let hipotenusa2 = 0;
let catetoAltura = 0;
let anguloC = 0;
let paso = 0;

// Elementos del DOM
document.addEventListener('DOMContentLoaded', function() {
    // Botones
    const calcularPrimerTrianguloBtn = document.getElementById('calcularPrimerTriangulo');
    const calcularSegundoTrianguloBtn = document.getElementById('calcularSegundoTriangulo');

    // Añadir eventos a los botones
    calcularPrimerTrianguloBtn.addEventListener('click', calcularPrimerTriangulo);
    calcularSegundoTrianguloBtn.addEventListener('click', calcularSegundoTriangulo);
});

// Función para calcular el primer triángulo
function calcularPrimerTriangulo() {
    // Obtener valores de los inputs
    catetoA = parseFloat(document.getElementById('catetoA').value);
    catetoB = parseFloat(document.getElementById('catetoB').value);

    // Validar que haya ingresado valores válidos
    if (isNaN(catetoA) || isNaN(catetoB) || catetoA <= 0 || catetoB <= 0) {
        alert('Por favor ingrese valores válidos para los catetos');
        return;
    }

    // Calcular la hipotenusa usando el teorema de Pitágoras
    hipotenusa = Math.sqrt(Math.pow(catetoA, 2) + Math.pow(catetoB, 2));
    
    // Mostrar el resultado de la hipotenusa
    document.getElementById('hipotenusaValor').textContent = hipotenusa.toFixed(2);
    
    // Actualizar UI para mostrar el siguiente paso
    document.getElementById('paso1Results').style.display = 'block';
    document.getElementById('calcularPrimerTriangulo').style.display = 'none';
    document.getElementById('calcularSegundoTriangulo').style.display = 'block';
    document.getElementById('primerTrianguloVis').style.display = 'block';
    document.getElementById('instruccionInicial').style.display = 'none';
    
    // Actualizar paso
    paso = 1;
    
    // Dibujar el primer triángulo
    dibujarPrimerTriangulo();
}

// Función para calcular el segundo triángulo
function calcularSegundoTriangulo() {
    // Obtener valor del input
    catetoOtro = parseFloat(document.getElementById('catetoOtro').value);
    
    // Validar que haya ingresado un valor válido
    if (isNaN(catetoOtro) || catetoOtro <= 0) {
        alert('Por favor ingrese un valor válido para el cateto altura');
        return;
    }
    
    // Calcular la hipotenusa del segundo triángulo
    hipotenusa2 = Math.sqrt(Math.pow(hipotenusa, 2) + Math.pow(catetoOtro, 2));
    
    // Calcular cateto altura para el tercer triángulo
    catetoAltura = catetoB * 2;
    
    // Calcular el ángulo C usando la ley de cosenos
    let cosC = (Math.pow(hipotenusa2, 2) + Math.pow(hipotenusa2, 2) - Math.pow(catetoAltura, 2)) / (2 * hipotenusa2 * hipotenusa2);
    
    // Asegurar que el valor esté en el rango [-1, 1] para evitar errores numéricos
    cosC = Math.max(-1.0, Math.min(1.0, cosC));
    
    // Calcular el ángulo en radianes y convertirlo a grados
    anguloC = Math.acos(cosC) * (180 / Math.PI);
    anguloC = Math.round(anguloC * 100) / 100; // Redondear a 2 decimales
    
    // Mostrar resultados finales
    document.getElementById('hipotenusaResultado').textContent = hipotenusa.toFixed(2);
    document.getElementById('hipotenusa2Resultado').textContent = hipotenusa2.toFixed(2);
    document.getElementById('catetoAlturaResultado').textContent = catetoAltura.toFixed(2);
    document.getElementById('anguloCResultado').textContent = anguloC.toFixed(2) + '°';
    
    // Mostrar los resultados y triángulos
    document.getElementById('resultadosFinales').style.display = 'block';
    document.getElementById('segundoTrianguloVis').style.display = 'block';
    document.getElementById('tercerTrianguloVis').style.display = 'block';
    
    // Dibujar los triángulos
    dibujarSegundoTriangulo();
    dibujarTercerTriangulo();
}

// Función para escalar valores para la visualización
function escalarValor(valor) {
    // Factor de escala: asume que los valores están entre 1-20, ajusta según necesidades
    const factorEscala = 10;
    return valor * factorEscala;
}

// Función para dibujar el primer triángulo
function dibujarPrimerTriangulo() {
    // Calcular las dimensiones necesarias basadas en los valores
    const width = Math.max(200, escalarValor(catetoA) + 30); // 30px de margen
    const height = Math.max(100, escalarValor(catetoB) + 30);
    
    // Crear el contenedor para el SVG
    const container = document.getElementById('triangulo1Container');
    container.innerHTML = '';
    const svgContainer = document.createElement('div');
    svgContainer.style.width = width + 'px';
    svgContainer.style.height = height + 'px';
    svgContainer.style.border = '1px solid #ccc';
    svgContainer.style.overflow = 'visible';
    
    // Crear el SVG
    const svgContent = `
        <svg class="triangle" viewBox="0 0 ${width/2} ${height/2}" width="100%" height="100%">
            <polygon
                points="10,${height/2-10} ${10 + escalarValor(catetoA)},${height/2-10} ${10 + escalarValor(catetoA)},${(height/2-10) - escalarValor(catetoB)}"
                fill="rgba(0,123,255,0.2)"
                stroke="blue"
                stroke-width="2" />

            <!-- Etiquetas dinámicas -->
            <text x="${10 + escalarValor(catetoA) / 2}" y="${height/2-2}" class="measurements" font-size="4px">${catetoA}</text>
            <text x="${12 + escalarValor(catetoA)}" y="${(height/2-10) - escalarValor(catetoB) / 2}" class="measurements" font-size="6px">${catetoB}</text>
            <text x="${10 + escalarValor(catetoA) / 2}" y="${(height/2-10) - escalarValor(catetoB) / 2}" class="measurements" font-size="6px">${hipotenusa.toFixed(2)}</text>
        </svg>
    `;
    
    svgContainer.innerHTML = svgContent;
    container.appendChild(svgContainer);
}

// Función para dibujar el segundo triángulo
function dibujarSegundoTriangulo() {
    // Calcular las dimensiones necesarias para el segundo triángulo
    const width2 = Math.max(200, escalarValor(hipotenusa) + 30);
    const height2 = Math.max(100, escalarValor(catetoOtro) + 30);
    const margenIzquierdo = 20; // Margen pequeño a la izquierda
    
    // Crear el contenedor para el SVG
    const container = document.getElementById('triangulo2Container');
    container.innerHTML = '';
    const svgContainer = document.createElement('div');
    svgContainer.style.width = width2 + 'px';
    svgContainer.style.height = height2 + 'px';
    svgContainer.style.border = '1px solid #ccc';
    svgContainer.style.overflow = 'visible';
    
    // Crear el SVG
    const svgContent = `
        <svg class="triangle" viewBox="0 0 ${width2/2} ${height2/2}" width="100%" height="100%">
            <polygon
                points="${margenIzquierdo},${height2/2-10} ${margenIzquierdo + escalarValor(hipotenusa)},${height2/2-10} ${margenIzquierdo + escalarValor(hipotenusa)},${(height2/2-10) - escalarValor(catetoOtro)}"
                fill="rgba(40,167,69,0.2)"
                stroke="green"
                stroke-width="2" />

            <!-- Etiquetas dinámicas -->
            <text x="${margenIzquierdo + escalarValor(hipotenusa) / 2}" y="${height2/2-5}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa.toFixed(2)}</text>
            <text x="${margenIzquierdo + escalarValor(hipotenusa) + 2}" y="${(height2/2-10) - escalarValor(catetoOtro) / 2}" class="measurements" font-size="6px">${catetoOtro.toFixed(2)}</text>
            <text x="${margenIzquierdo + escalarValor(hipotenusa) / 2}" y="${(height2/2-10) - escalarValor(catetoOtro) / 2}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa2.toFixed(2)}</text>
        </svg>
    `;
    
    svgContainer.innerHTML = svgContent;
    container.appendChild(svgContainer);
}

// Función para dibujar el tercer triángulo
function dibujarTercerTriangulo() {
    // Calcular las dimensiones para el tercer triángulo
    const width3 = Math.max(200, escalarValor(catetoAltura) + 30);
    const height3 = Math.max(200, escalarValor(hipotenusa2) + 30);
    
    // Crear el contenedor para el SVG
    const container = document.getElementById('triangulo3Container');
    container.innerHTML = '';
    const svgContainer = document.createElement('div');
    svgContainer.style.width = width3 + 'px';
    svgContainer.style.height = height3 + 'px';
    svgContainer.style.border = '1px solid #ccc';
    svgContainer.style.overflow = 'visible';
    
    // Crear el SVG
    const svgContent = `
        <svg class="triangle" viewBox="0 0 ${width3/2} ${height3/2}" width="100%" height="100%">
            <polygon 
                points="${width3/4 - escalarValor(catetoAltura) / 2},${height3/2-10} ${width3/4 + escalarValor(catetoAltura) / 2},${height3/2-10} ${width3/4},${(height3/2-10) - escalarValor(hipotenusa2)}"
                fill="rgba(40,167,69,0.2)"
                stroke="red" 
                stroke-width="2" />
            
            <!-- Base etiqueta (catetoAltura) -->
            <text 
                x="${width3/4}" 
                y="${height3/2-5}" 
                class="measurements" 
                font-size="6px" 
                text-anchor="middle">
                ${catetoAltura.toFixed(2)}
            </text>

            <!-- Lado izquierdo etiqueta (hipotenusa2) -->
            <text 
                x="${width3/4 - escalarValor(catetoAltura) / 2 - 5}" 
                y="${(height3/2-10) - escalarValor(hipotenusa2) / 2}" 
                class="measurements" 
                font-size="6px" 
                text-anchor="end">
                ${hipotenusa2.toFixed(2)}
            </text>

            <!-- Lado derecho etiqueta (hipotenusa2) -->
            <text 
                x="${width3/4 + escalarValor(catetoAltura) / 2 + 5}" 
                y="${(height3/2-10) - escalarValor(hipotenusa2) / 2}" 
                class="measurements" 
                font-size="6px" 
                text-anchor="start">
                ${hipotenusa2.toFixed(2)}
            </text>

            <!-- Ángulo C centrado arriba del vértice -->
            <path 
                d="M ${width3/4 - 5},${(height3/2-10) - escalarValor(hipotenusa2) + 5} 
                A 5 5 0 0 1 ${width3/4 + 5},${(height3/2-10) - escalarValor(hipotenusa2) + 5}" 
                fill="none" 
                stroke="red" 
                stroke-width="1" />
            <text 
                x="${width3/4}" 
                y="${(height3/2-10) - escalarValor(hipotenusa2) - 5}" 
                class="measurements" 
                font-size="6px" 
                text-anchor="middle">
                C=${anguloC.toFixed(2)}°
            </text>
        </svg>
    `;
    
    svgContainer.innerHTML = svgContent;
    container.appendChild(svgContainer);
}