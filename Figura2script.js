// Variables globales
let catetoA, catetoB, altura, hipotenusa, hipotenusa2, baseTriangulo, anguloC;
let paso = 0;

// Capturar elementos del DOM
document.addEventListener('DOMContentLoaded', function() {
    // Botón para calcular el primer triángulo
    document.getElementById('calcularPrimerTriangulo').addEventListener('click', calcularPrimerTriangulo);
    
    // Botón para calcular el segundo triángulo
    document.getElementById('calcularSegundoTriangulo').addEventListener('click', calcularSegundoTriangulo);
});

// Función para escalar valores para la visualización
function escalarValor(valor) {
    // Factor de escala: asume que los valores están entre 1-20, ajusta según necesidades
    const factorEscala = 10;
    return valor * factorEscala;
}

// Calcular primer triángulo
function calcularPrimerTriangulo() {
    // Obtener valores de los inputs
    catetoA = parseFloat(document.getElementById('catetoA').value);
    catetoB = parseFloat(document.getElementById('catetoB').value);
    
    // Validar que los inputs tengan valores numéricos
    if (isNaN(catetoA) || isNaN(catetoB) || catetoA <= 0 || catetoB <= 0) {
        alert('Por favor, ingrese valores válidos mayores que cero para los catetos.');
        return;
    }
    
    // Calcular hipotenusa usando el teorema de Pitágoras
    hipotenusa = Math.sqrt(Math.pow(catetoA, 2) + Math.pow(catetoB, 2));
    
    // Mostrar resultado y avanzar al siguiente paso
    document.getElementById('hipotenusaValor').textContent = hipotenusa.toFixed(2);
    document.getElementById('paso1Resultados').style.display = 'block';
    document.getElementById('calcularPrimerTriangulo').style.display = 'none';
    document.getElementById('calcularSegundoTriangulo').style.display = 'block';
    document.getElementById('mensaje-inicial').style.display = 'none';
    
    // Mostrar visualización del primer triángulo
    document.getElementById('primerTriangulo').style.display = 'block';
    dibujarPrimerTriangulo();
    
    paso = 1;
}

// Calcular segundo triángulo
function calcularSegundoTriangulo() {
    // Obtener valor de la altura
    altura = parseFloat(document.getElementById('altura').value);
    
    // Validar que el input tenga un valor numérico
    if (isNaN(altura) || altura <= 0) {
        alert('Por favor, ingrese un valor válido mayor que cero para la altura.');
        return;
    }
    
    // Calcular hipotenusa del segundo triángulo usando el teorema de Pitágoras
    hipotenusa2 = Math.sqrt(Math.pow(altura, 2) + Math.pow(hipotenusa, 2));
    
    // Base del tercer triangulo es el doble del catetoB
    baseTriangulo = catetoB * 2;
    
    // El angulo C del triangulo usando ley de cosenos
    let cosC = (Math.pow(hipotenusa2, 2) + Math.pow(hipotenusa2, 2) - Math.pow(baseTriangulo, 2)) / (2 * hipotenusa2 * hipotenusa2);
    
    // Aseguramos que el valor esté en el rango [-1, 1] para evitar errores numéricos
    cosC = Math.max(-1.0, Math.min(1.0, cosC));
    
    // Calculamos el ángulo en radianes y lo convertimos a grados
    anguloC = Math.acos(cosC) * (180 / Math.PI);
    anguloC = Math.round(anguloC * 100) / 100; // Redondear a 2 decimales
    
    // Mostrar resultados finales
    document.getElementById('hipotenusa1Final').textContent = hipotenusa.toFixed(2);
    document.getElementById('hipotenusa2Final').textContent = hipotenusa2.toFixed(2);
    document.getElementById('baseTrianguloFinal').textContent = baseTriangulo.toFixed(2);
    document.getElementById('anguloCFinal').textContent = anguloC.toFixed(2) + '°';
    document.getElementById('resultadosFinales').style.display = 'block';
    document.getElementById('calcularSegundoTriangulo').style.display = 'none';
    
    // Mostrar visualizaciones de los triángulos
    document.getElementById('segundoTriangulo').style.display = 'block';
    document.getElementById('tercerTriangulo').style.display = 'block';
    dibujarSegundoTriangulo();
    dibujarTercerTriangulo();
}

// Dibujar primer triángulo
function dibujarPrimerTriangulo() {
    const container = document.getElementById('triangulo1Container');
    const width = Math.max(200, escalarValor(catetoA) + 30); // 30px de margen
    const height = Math.max(100, escalarValor(catetoB) + 30);
    
    container.innerHTML = `
        <div style="width: ${width}px; height: ${height}px; border: 1px solid #ccc; overflow: visible;">
            <svg class="triangle" viewBox="0 0 ${width/2} ${height/2}" width="100%" height="100%">
                <polygon
                    points="10,${height/2-10} ${10 + escalarValor(catetoA)},${height/2-10} ${10 + escalarValor(catetoA)},${(height/2-10) - escalarValor(catetoB)}"
                    fill="rgba(0,123,255,0.2)"
                    stroke="blue"
                    stroke-width="2" />
                <text x="${10 + escalarValor(catetoA) / 2}" y="${height/2-2}" class="measurements" font-size="4px" text-anchor="middle">${catetoA}</text>
                <text x="${12 + escalarValor(catetoA)}" y="${(height/2-10) - escalarValor(catetoB) / 2}" class="measurements" font-size="6px">${catetoB}</text>
                <text x="${10 + escalarValor(catetoA) / 2}" y="${(height/2-10) - escalarValor(catetoB) / 2}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa.toFixed(2)}</text>
            </svg>
        </div>
    `;
}

// Dibujar segundo triángulo
function dibujarSegundoTriangulo() {
    const container = document.getElementById('triangulo2Container');
    const width2 = Math.max(200, escalarValor(hipotenusa) + 30);
    const height2 = Math.max(100, escalarValor(altura) + 30);
    const margenIzquierdo = 20;
    
    container.innerHTML = `
        <div style="width: ${width2}px; height: ${height2}px; border: 1px solid #ccc; overflow: visible;">
            <svg class="triangle" viewBox="0 0 ${width2/2} ${height2/2}" width="100%" height="100%">
                <polygon
                    points="${margenIzquierdo},${height2/2-10} ${margenIzquierdo + escalarValor(hipotenusa)},${height2/2-10} ${margenIzquierdo + escalarValor(hipotenusa)},${(height2/2-10) - escalarValor(altura)}"
                    fill="rgba(40,167,69,0.2)"
                    stroke="green"
                    stroke-width="2" />
                <text x="${margenIzquierdo + escalarValor(hipotenusa) / 2}" y="${height2/2-5}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa.toFixed(2)}</text>
                <text x="${margenIzquierdo + escalarValor(hipotenusa) + 2}" y="${(height2/2-10) - escalarValor(altura) / 2}" class="measurements" font-size="6px">${altura.toFixed(2)}</text>
                <text x="${margenIzquierdo + escalarValor(hipotenusa) / 2}" y="${(height2/2-10) - escalarValor(altura) / 2}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa2.toFixed(2)}</text>
            </svg>
        </div>
    `;
}

// Dibujar tercer triángulo
function dibujarTercerTriangulo() {
    const container = document.getElementById('triangulo3Container');
    const width3 = Math.max(300, escalarValor(baseTriangulo) + 30);
    const height3 = Math.max(200, escalarValor(hipotenusa2) + 30);
    
    // Calcular los puntos para el triángulo isósceles
    const centerX = width3/4;
    const baseY = height3/2-10;
    const halfBase = escalarValor(baseTriangulo) / 2;
    
    container.innerHTML = `
        <div style="width: ${width3}px; height: ${height3}px; border: 1px solid #ccc; overflow: visible;">
            <svg class="triangle" viewBox="0 0 ${width3/2} ${height3/2}" width="100%" height="100%">
                <polygon
                    points="${centerX - halfBase},${baseY} ${centerX + halfBase},${baseY} ${centerX},${baseY - escalarValor(hipotenusa2)}"
                    fill="rgba(220,53,69,0.2)"
                    stroke="red"
                    stroke-width="2" />
                <text x="${centerX}" y="${baseY + 5}" class="measurements" font-size="6px" text-anchor="middle">${baseTriangulo.toFixed(2)}</text>
                <text x="${centerX - halfBase / 2}" y="${baseY - escalarValor(hipotenusa2) / 2}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa2.toFixed(2)}</text>
                <text x="${centerX + halfBase / 2}" y="${baseY - escalarValor(hipotenusa2) / 2}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa2.toFixed(2)}</text>
                <text x="${centerX}" y="${baseY - escalarValor(hipotenusa2) - 5}" class="measurements" font-size="6px" text-anchor="middle" font-weight="bold">${anguloC.toFixed(2)}°</text>
            </svg>
        </div>
    `;
}

// Función para reiniciar el cálculo
function reiniciarCalculo() {
    // Resetear variables globales
    catetoA = null;
    catetoB = null;
    altura = null;
    hipotenusa = null;
    hipotenusa2 = null;
    baseTriangulo = null;
    anguloC = null;
    paso = 0;
    
    // Resetear la interfaz
    document.getElementById('catetoA').value = '';
    document.getElementById('catetoB').value = '';
    document.getElementById('altura').value = '';
    
    // Ocultar resultados
    document.getElementById('paso1Resultados').style.display = 'none';
    document.getElementById('resultadosFinales').style.display = 'none';
    
    // Ocultar visualizaciones
    document.getElementById('primerTriangulo').style.display = 'none';
    document.getElementById('segundoTriangulo').style.display = 'none';
    document.getElementById('tercerTriangulo').style.display = 'none';
    
    // Mostrar botón inicial
    document.getElementById('calcularPrimerTriangulo').style.display = 'block';
    document.getElementById('calcularSegundoTriangulo').style.display = 'none';
    document.getElementById('mensaje-inicial').style.display = 'block';
    
    // Limpiar contenedores de triangulos
    document.getElementById('triangulo1Container').innerHTML = '';
    document.getElementById('triangulo2Container').innerHTML = '';
    document.getElementById('triangulo3Container').innerHTML = '';
}
