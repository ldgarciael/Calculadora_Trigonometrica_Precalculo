document.addEventListener('DOMContentLoaded', function() {
    // Variables para almacenar los resultados
    let hipotenusa1, hipotenusa2, hipotenusa3, hipotenusa4;
    let baseTriangulo, anguloC;
    let catetoA, catetoB, catetoOtro, catetoOtro2, altura;
    let lado1, lado2;

    // Botones de cálculo
    const btnPaso1 = document.getElementById('calcularPaso1');
    const btnPaso2 = document.getElementById('calcularPaso2');
    const btnPaso3 = document.getElementById('calcularPaso3');
    const btnPaso4 = document.getElementById('calcularPaso4');
    const btnPaso5 = document.getElementById('calcularPaso5');
    const btnReiniciar = document.getElementById('reiniciar');

    // Asignar eventos a los botones
    btnPaso1.addEventListener('click', calcularPrimerTriangulo);
    btnPaso2.addEventListener('click', calcularSegundoTriangulo);
    btnPaso3.addEventListener('click', calcularTercerTriangulo);
    btnPaso4.addEventListener('click', calcularCuartoTriangulo);
    btnPaso5.addEventListener('click', calcularQuintoTriangulo);
    btnReiniciar.addEventListener('click', reiniciarCalculos);

    // Función para calcular el primer triángulo
    function calcularPrimerTriangulo() {
        catetoA = parseFloat(document.getElementById('catetoA').value);
        catetoB = parseFloat(document.getElementById('catetoB').value);

        if (isNaN(catetoA) || isNaN(catetoB) || catetoA <= 0 || catetoB <= 0) {
            alert('Por favor, ingrese valores numéricos válidos mayores que cero para los catetos.');
            return;
        }

        // Calculamos la hipotenusa usando el teorema de Pitágoras
        hipotenusa1 = Math.sqrt(Math.pow(catetoA, 2) + Math.pow(catetoB, 2));
        
        // Mostramos el resultado
        document.getElementById('hipotenusa1Resultado').textContent = hipotenusa1.toFixed(2);
        document.getElementById('resultadoPaso1').style.display = 'block';
        
        // Mostramos el formulario para el segundo triángulo
        document.getElementById('paso2Form').style.display = 'block';
        btnPaso1.style.display = 'none';
        btnPaso2.style.display = 'block';
        
        // Actualizamos la visualización
        document.getElementById('visualizacionInicial').style.display = 'none';
        document.getElementById('visualizacionPaso1').style.display = 'block';
        
        // Dibujamos el primer triángulo
        dibujarTriangulo1(catetoA, catetoB, hipotenusa1);
    }

    // Función para calcular el segundo triángulo
    function calcularSegundoTriangulo() {
        catetoOtro = parseFloat(document.getElementById('catetoOtro').value);
        catetoOtro2 = parseFloat(document.getElementById('catetoOtro2').value);

        if (isNaN(catetoOtro) || isNaN(catetoOtro2) || catetoOtro <= 0 || catetoOtro2 <= 0) {
            alert('Por favor, ingrese valores numéricos válidos mayores que cero para los catetos.');
            return;
        }

        // Calculamos la hipotenusa usando el teorema de Pitágoras
        hipotenusa2 = Math.sqrt(Math.pow(catetoOtro, 2) + Math.pow(catetoOtro2, 2));
        
        // Mostramos el resultado
        document.getElementById('hipotenusa2Resultado').textContent = hipotenusa2.toFixed(2);
        document.getElementById('resultadoPaso2').style.display = 'block';
        
        // Mostramos el formulario para el tercer triángulo
        document.getElementById('paso3Form').style.display = 'block';
        btnPaso2.style.display = 'none';
        btnPaso3.style.display = 'block';
        
        // Actualizamos la visualización
        document.getElementById('visualizacionPaso2').style.display = 'block';
        
        // Dibujamos el segundo triángulo
        dibujarTriangulo2(catetoOtro, catetoOtro2, hipotenusa2);
    }

    // Función para calcular el tercer triángulo
    function calcularTercerTriangulo() {
        altura = parseFloat(document.getElementById('altura').value);

        if (isNaN(altura) || altura <= 0) {
            alert('Por favor, ingrese un valor numérico válido mayor que cero para la altura.');
            return;
        }

        // Calculamos la hipotenusa del tercer triángulo
        hipotenusa3 = Math.sqrt(Math.pow(altura, 2) + Math.pow(hipotenusa1, 2));
        
        // Mostramos el resultado
        document.getElementById('hipotenusa3Resultado').textContent = hipotenusa3.toFixed(2);
        document.getElementById('resultadoPaso3').style.display = 'block';
        
        // Mostramos la información para el cuarto triángulo
        document.getElementById('paso4Info').style.display = 'block';
        document.getElementById('alturaValor').textContent = altura.toFixed(2);
        document.getElementById('hipotenusa2Valor').textContent = hipotenusa2.toFixed(2);
        
        btnPaso3.style.display = 'none';
        btnPaso4.style.display = 'block';
        
        // Actualizamos la visualización
        document.getElementById('visualizacionPaso3').style.display = 'block';
        
        // Dibujamos el tercer triángulo
        dibujarTriangulo3(altura, hipotenusa1, hipotenusa3);
    }

    // Función para calcular el cuarto triángulo
    function calcularCuartoTriangulo() {
        // Calculamos la hipotenusa del cuarto triángulo
        hipotenusa4 = Math.sqrt(Math.pow(altura, 2) + Math.pow(hipotenusa2, 2));
        
        // Mostramos el resultado
        document.getElementById('hipotenusa4Resultado').textContent = hipotenusa4.toFixed(2);
        document.getElementById('resultadoPaso4').style.display = 'block';
        
        // Mostramos la información para el quinto triángulo
        document.getElementById('paso5Info').style.display = 'block';
        
        btnPaso4.style.display = 'none';
        btnPaso5.style.display = 'block';
        
        // Actualizamos la visualización
        document.getElementById('visualizacionPaso4').style.display = 'block';
        
        // Dibujamos el cuarto triángulo
        dibujarTriangulo4(altura, hipotenusa2, hipotenusa4);
    }

    // Función para calcular el quinto triángulo y el ángulo final
    function calcularQuintoTriangulo() {
        // Calculamos los lados para formar la base del triángulo
        lado1 = catetoA - catetoOtro2;
        lado2 = catetoOtro + catetoB;
        baseTriangulo = Math.sqrt(Math.pow(lado1, 2) + Math.pow(lado2, 2));
        
        // Calculamos el ángulo C usando la ley de cosenos
        let cosC = (Math.pow(hipotenusa3, 2) + Math.pow(hipotenusa4, 2) - Math.pow(baseTriangulo, 2)) / (2 * hipotenusa3 * hipotenusa4);
        
        // Aseguramos que el valor esté en el rango [-1, 1] para evitar errores numéricos
        cosC = Math.max(-1.0, Math.min(1.0, cosC));
        
        // Calculamos el ángulo en radianes y lo convertimos a grados
        anguloC = Math.acos(cosC) * (180 / Math.PI);
        anguloC = Math.round(anguloC * 100) / 100; // Redondear a 2 decimales
        
        // Mostramos los resultados finales
        document.getElementById('anguloCResultado').textContent = anguloC.toFixed(2);
        
        document.getElementById('hipotenusa1Final').textContent = hipotenusa1.toFixed(2);
        document.getElementById('hipotenusa2Final').textContent = hipotenusa2.toFixed(2);
        document.getElementById('hipotenusa3Final').textContent = hipotenusa3.toFixed(2);
        document.getElementById('hipotenusa4Final').textContent = hipotenusa4.toFixed(2);
        document.getElementById('baseTrianguloFinal').textContent = baseTriangulo.toFixed(2);
        document.getElementById('anguloCFinal').textContent = anguloC.toFixed(2) + '°';
        
        document.getElementById('resultadoFinal').style.display = 'block';
        btnPaso5.style.display = 'none';
        
        // Actualizamos la visualización
        document.getElementById('visualizacionPaso5').style.display = 'block';
        
        // Dibujamos el quinto triángulo
        dibujarTriangulo5(baseTriangulo, hipotenusa3, hipotenusa4, anguloC);
    }

    // Función para reiniciar todos los cálculos
    function reiniciarCalculos() {
        location.reload();
    }

    // Función para escalar valores para la visualización
    function escalarValor(valor) {
        return valor * 10; // Factor de escala
    }

    // Funciones para dibujar los triángulos usando SVG
    function dibujarTriangulo1(catetoA, catetoB, hipotenusa) {
        const container = document.getElementById('triangulo1Container');
        const width = Math.max(200, escalarValor(catetoA) + 30);
        const height = Math.max(100, escalarValor(catetoB) + 30);
        
        container.innerHTML = `
            <div style="width: ${width}px; height: ${height}px; border: 1px solid #ccc; overflow: visible;">
                <svg class="triangle" viewBox="0 0 ${width/2} ${height/2}" width="100%" height="100%">
                    <polygon
                        points="10,${height/2-10} ${10 + escalarValor(catetoA)},${height/2-10} ${10 + escalarValor(catetoA)},${(height/2-10) - escalarValor(catetoB)}"
                        fill="rgba(0,123,255,0.2)"
                        stroke="blue"
                        stroke-width="2" />
                    <text x="${10 + escalarValor(catetoA) / 2}" y="${height/2-2}" class="measurements" font-size="4px">${catetoA}</text>
                    <text x="${12 + escalarValor(catetoA)}" y="${(height/2-10) - escalarValor(catetoB) / 2}" class="measurements" font-size="6px">${catetoB}</text>
                    <text x="${10 + escalarValor(catetoA) / 2}" y="${(height/2-10) - escalarValor(catetoB) / 2}" class="measurements" font-size="6px">${hipotenusa.toFixed(2)}</text>
                </svg>
            </div>
        `;
    }

    function dibujarTriangulo2(catetoOtro, catetoOtro2, hipotenusa2) {
        const container = document.getElementById('triangulo2Container');
        const width = Math.max(200, escalarValor(catetoOtro) + 30);
        const height = Math.max(100, escalarValor(catetoOtro2) + 30);
        const margenIzquierdo = 20;
        
        container.innerHTML = `
            <div style="width: ${width}px; height: ${height}px; border: 1px solid #ccc; overflow: visible;">
                <svg class="triangle" viewBox="0 0 ${width/2} ${height/2}" width="100%" height="100%">
                    <polygon
                        points="${margenIzquierdo},${height/2-10} ${margenIzquierdo + escalarValor(catetoOtro)},${height/2-10} ${margenIzquierdo + escalarValor(catetoOtro)},${(height/2-10) - escalarValor(catetoOtro2)}"
                        fill="rgba(40,167,69,0.2)"
                        stroke="green"
                        stroke-width="2" />
                    <text x="${margenIzquierdo + escalarValor(catetoOtro) / 2}" y="${height/2-5}" class="measurements" font-size="6px" text-anchor="middle">${catetoOtro.toFixed(2)}</text>
                    <text x="${margenIzquierdo + escalarValor(catetoOtro) + 2}" y="${(height/2-10) - escalarValor(catetoOtro2) / 2}" class="measurements" font-size="6px">${catetoOtro2.toFixed(2)}</text>
                    <text x="${margenIzquierdo + escalarValor(catetoOtro) / 2}" y="${(height/2-10) - escalarValor(catetoOtro2) / 2}" class="measurements" font-size="6px" text-anchor="middle">${hipotenusa2.toFixed(2)}</text>
                </svg>
            </div>
        `;
    }

    function dibujarTriangulo3(altura, hipotenusa1, hipotenusa3) {
        const container = document.getElementById('triangulo3Container');
        const width = Math.max(200, escalarValor(altura) + 30);
        const height = Math.max(200, escalarValor(hipotenusa1) + 30);
        
        container.innerHTML = `
            <div style="width: ${width}px; height: ${height}px; border: 1px solid #ccc; overflow: visible;">
                <svg class="triangle" viewBox="0 0 ${width/2} ${height/2}" width="100%" height="100%">
                    <polygon 
                        points="${width/4 - escalarValor(altura) / 2},${height/2-10} ${width/4 + escalarValor(altura) / 2},${height/2-10} ${width/4},${(height/2-10) - escalarValor(hipotenusa1)}"
                        fill="rgba(40,167,69,0.2)"
                        stroke="red" 
                        stroke-width="2" />
                    <text 
                        x="${width/4}" 
                        y="${height/2-5}" 
                        class="measurements" 
                        font-size="6px" 
                        text-anchor="middle">
                        ${altura.toFixed(2)}
                    </text>
                    <text 
                        x="${width/4 - escalarValor(altura) / 4}" 
                        y="${(height/2-10) - escalarValor(hipotenusa1) / 2}" 
                        class="measurements" 
                        font-size="6px" 
                        text-anchor="middle">
                        ${hipotenusa1.toFixed(2)}
                    </text>
                    <text 
                        x="${width/4 + escalarValor(altura) / 4}" 
                        y="${(height/2-10) - escalarValor(hipotenusa1) / 2}" 
                        class="measurements" 
                        font-size="6px" 
                        text-anchor="middle">
                        ${hipotenusa3.toFixed(2)}
                    </text>
                </svg>
            </div>
        `;
    }

    function dibujarTriangulo4(altura, hipotenusa2, hipotenusa4) {
        const container = document.getElementById('triangulo4Container');
        const width = Math.max(200, escalarValor(altura) + 30);
        const height = Math.max(200, escalarValor(hipotenusa2) + 30);
        
        container.innerHTML = `
            <div style="width: ${width}px; height: ${height}px; border: 1px solid #ccc; overflow: visible;">
                <svg class="triangle" viewBox="0 0 ${width/2} ${height/2}" width="100%" height="100%">
                    <polygon 
                        points="${width/4 - escalarValor(altura) / 2},${height/2-10} ${width/4 + escalarValor(altura) / 2},${height/2-10} ${width/4},${(height/2-10) - escalarValor(hipotenusa2)}"
                        fill="rgba(255,193,7,0.2)"
                        stroke="orange" 
                        stroke-width="2" />
                    <text 
                        x="${width/4}" 
                        y="${height/2-5}" 
                        class="measurements" 
                        font-size="6px" 
                        text-anchor="middle">
                        ${altura.toFixed(2)}
                    </text>
                    <text 
                        x="${width/4 - escalarValor(altura) / 4}" 
                        y="${(height/2-10) - escalarValor(hipotenusa2) / 2}" 
                        class="measurements" 
                        font-size="6px" 
                        text-anchor="middle">
                        ${hipotenusa2.toFixed(2)}
                    </text>
                    <text 
                        x="${width/4 + escalarValor(altura) / 4}" 
                        y="${(height/2-10) - escalarValor(hipotenusa2) / 2}" 
                        class="measurements" 
                        font-size="6px" 
                        text-anchor="middle">
                        ${hipotenusa4.toFixed(2)}
                    </text>
                </svg>
            </div>
        `;
    }

    function dibujarTriangulo5(baseTriangulo, hipotenusa3, hipotenusa4, anguloC) {
        const container = document.getElementById('triangulo5Container');
        const width = Math.max(300, escalarValor(baseTriangulo) + 30);
        const height = Math.max(200, escalarValor(Math.max(hipotenusa3, hipotenusa4)) + 30);
        const margenX = width / 6;
        const margenY = height / 6;
        
        // Calcular los puntos del triángulo
        const x1 = margenX;
        const y1 = height - margenY;
        
        const x3 = margenX + escalarValor(baseTriangulo);
        const y3 = height - margenY;
        
        // Calcular el punto superior usando la ley de cosenos y trigonometría
        const anguloCRad = anguloC * Math.PI / 180;
        const x2 = margenX + escalarValor(hipotenusa3) * Math.cos(Math.PI - anguloCRad);
        const y2 = height - margenY - escalarValor(hipotenusa3) * Math.sin(Math.PI - anguloCRad);
        
        container.innerHTML = `
            <div style="width: ${width}px; height: ${height}px; border: 1px solid #ccc; overflow: visible;">
                <svg class="triangle" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
                    <polygon 
                        points="${x1},${y1} ${x2},${y2} ${x3},${y3}"
                        fill="rgba(220,53,69,0.2)"
                        stroke="purple" 
                        stroke-width="2" />
                    <text 
                        x="${(x1 + x3) / 2}" 
                        y="${y1 + 15}" 
                        class="measurements" 
                        font-size="12px" 
                        text-anchor="middle">
                        ${baseTriangulo.toFixed(2)}
                    </text>
                    <text 
                        x="${(x1 + x2) / 2 - 15}" 
                        y="${(y1 + y2) / 2}" 
                        class="measurements" 
                        font-size="12px" 
                        text-anchor="middle">
                        ${hipotenusa3.toFixed(2)}
                    </text>
                    <text 
                        x="${(x2 + x3) / 2 + 15}" 
                        y="${(y2 + y3) / 2}" 
                        class="measurements" 
                        font-size="12px" 
                        text-anchor="middle">
                        ${hipotenusa4.toFixed(2)}
                    </text>
                    <text 
                        x="${x2}" 
                        y="${y2 - 10}" 
                        class="measurements" 
                        font-size="14px" 
                        text-anchor="middle" 
                        font-weight="bold">
                        ${anguloC.toFixed(2)}°
                    </text>
                </svg>
            </div>
        `;
    }
});