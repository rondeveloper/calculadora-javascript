const n7 = document.getElementById('numero7')
const result = document.getElementById('result')
const C = document.getElementById('clear')
const same = document.getElementById('same')
const change = document.getElementById("change-the-sign")
const keys = document.querySelectorAll(".key")
const ce = document.getElementById('CE')
const Root = document.getElementById('Root')
const calculation = document.getElementById('calculation')
const conthistory = document.getElementById('conthistory')
const hw = document.getElementById('history-window')
let ul = document.createElement('ul')
let li = document.createElement('li')
let visantres
let conttecla = ''
let delcom = ''
let booleanteclamenos = true
let booleanteclamas = false
let booleanteclamultiplicacion = false
let booleantecladivision = false
let booleantecladot = true
let allcaracter = true
let changesame = false

ul.setAttribute('style', 'list-style:none')

for (const tecla of keys) {
    tecla.addEventListener('click', () => {
        changesame = false
        if (conttecla.length == 9) {
            result.style.fontSize = "43px"
        } else if (conttecla.length == 13) {
            result.style.fontSize = "33px"
        } else if (conttecla.length == 17) {
            result.style.fontSize = "25px"
        } else if (conttecla.length == 22) {
            result.style.fontSize = "20px"
        } else if (conttecla.length == 27) {
            allcaracter = false
        }
        switch (tecla.textContent) {
            case '.':
                if (booleantecladot) {
                    conttecla += '.'
                    result.textContent = conttecla
                    visantres = result.textContent
                    booleantecladot = false
                    if (conttecla.length == 1) {
                        booleanteclamenos = false
                        booleanteclamas = false
                        booleanteclamultiplicacion = false
                        booleantecladivision = false
                    }
                }
                break;
            case '-':
                if (booleanteclamenos) {
                    conttecla += '-'
                    result.textContent = conttecla
                    visantres = result.textContent
                    booleanteclamenos = false
                    booleanteclamas = false
                    booleanteclamultiplicacion = false
                    booleantecladivision = false
                    booleantecladot = true
                }
                break;
            case '/':
                if (booleantecladivision) {
                    conttecla += '/'
                    result.textContent = conttecla
                    visantres = result.textContent
                    booleanteclamenos = false
                    booleanteclamas = false
                    booleanteclamultiplicacion = false
                    booleantecladivision = false
                    booleantecladot = true
                }
                break;
            case '+':
                if (booleanteclamas) {
                    conttecla += '+'
                    result.textContent = conttecla
                    visantres = result.textContent
                    booleanteclamenos = false
                    booleanteclamas = false
                    booleanteclamultiplicacion = false
                    booleantecladivision = false
                    booleantecladot = true
                }
                break;
            case 'X':
                if (booleanteclamultiplicacion) {
                    booleanteclamultiplicacion = false
                    conttecla += 'X'
                    result.textContent = conttecla
                    visantres = result.textContent
                    booleanteclamenos = true
                    booleanteclamas = false
                    booleantecladivision = false
                    booleantecladot = true
                }
                break;
            default:
                if (allcaracter) {
                    conttecla += tecla.textContent
                    result.textContent = conttecla
                    visantres = result.textContent
                    booleanteclamenos = true
                    booleanteclamas = true
                    booleanteclamultiplicacion = true
                    booleantecladivision = true
                    "error con los caracteres"
                } else if (conttecla.length <= 27) {
                    allcaracter = true
                }
        }
    })
}

Root.addEventListener('click', () => {
    visantres = result.textContent
    result.textContent = Math.sqrt(Math.abs(operarCadena(result.textContent)))
    let Ret = 0;
    if (Math.abs(result.textContent) - parseInt(Math.abs(result.textContent)) > 0) {
        let float = 0
        float = result.textContent - parseInt(result.textContent)
        float *= 10
        float = float.toFixed(2)
        if (Math.abs(float) - parseInt(Math.abs(float)) > 0) {
            Ret = parseFloat(result.textContent).toFixed(2)
            booleantecladot = false
        } else if (float - parseInt(float) == 0) {
            Ret = parseFloat(result.textContent).toFixed(1)
            booleantecladot = false
        }
    } else {
        Ret = parseInt(result.textContent)
    }
    result.textContent = Ret
    conthistory.style.overflowY = "scroll"
    ul.innerHTML = `<li>√${visantres} = ${result.textContent}</li>` + ul.innerHTML
    conthistory.appendChild(ul)
    conttecla = result.textContent
    calculation.innerText = visantres
})

C.addEventListener('click', () => {
    result.textContent = ''
    conttecla = ''
    booleanteclamenos = true
    booleanteclamas = false
    booleanteclamultiplicacion = false
    booleantecladivision = false
    booleantecladot = true
})

ce.addEventListener('click', () => {
    resultarray = result.textContent.split('')
    resultarray.pop()
    result.textContent = resultarray.toString()
    result.textContent = result.textContent.replace(/,/g, '')
    conttecla = result.textContent
    clearerror = conttecla.split('')
    regexb = /^\d$/gm
    regexboo = regexb.test(clearerror[clearerror.length - 1])
    if (conttecla.length == 0) {
        booleanteclamenos = true
        booleanteclamas = false
        booleanteclamultiplicacion = false
        booleantecladivision = false
        booleantecladot = true
    } else if (regexboo) {
        booleanteclamenos = true
        booleanteclamas = true
        booleanteclamultiplicacion = true
        booleantecladivision = true
        booleantecladot = true
    }
})

same.addEventListener('click', () => {
    if (calculation.innerText.length + calculation.innerText.length / 2 > 13) {
        conthistory.style.fontSize = "20px"
        conthistory.style.lineHeight = "25px"
    }
    if (booleanteclamenos == true &&
        booleanteclamas == true &&
        booleanteclamultiplicacion == true &&
        booleantecladivision == true) {
        let resultarray = result.textContent.split('')
        let operacion2 = 'sumar'
        let operacion3 = ''
        let number_end2 = ''
        let number_end = 0
        let numero_a_operar = ""
        for (let c2 of resultarray) {
            if (c2 == '+') {
                if (operacion2 == 'sumar') {
                    number_end += operarCadena(numero_a_operar)
                } else if (operacion2 == 'restar') {
                    if (operacion3 == 'menospormenos') {
                        number_end2 *= -operarCadena(numero_a_operar)
                        number_end += number_end2

                        operacion3 = ''
                        number_end2 = ''
                    } else {
                        number_end -= operarCadena(numero_a_operar)
                    }
                }
                operacion2 = 'sumar'
                numero_a_operar = ''
            } else if (c2 == '-') {
                if (operacion2 == 'sumar') {
                    lastx = numero_a_operar.split('')
                    if (lastx[lastx.length - 1] == 'X') {
                        operacion3 = 'menospormenos'
                        number_end2 += operarCadena(numero_a_operar)
                    } else {
                        number_end += operarCadena(numero_a_operar)
                    }
                } else if (operacion2 == 'restar') {
                    lastx = numero_a_operar.split('')
                    if (lastx[lastx.length - 1] == 'X') {
                        operacion3 = 'menospormenos'
                        number_end2 -= operarCadena(numero_a_operar)
                    } else {
                        if (operacion3 == 'menospormenos') {
                            number_end2 *= -operarCadena(numero_a_operar)
                            number_end += number_end2
                            number_end2 = ''
                            operacion3 = ''
                        } else {
                            number_end -= operarCadena(numero_a_operar)
                        }
                    }
                }
                operacion2 = 'restar'
                numero_a_operar = ''
            } else {
                numero_a_operar += c2
            }
        }
        if (operacion2 == 'sumar') {
            number_end += operarCadena(numero_a_operar)
        } else if (operacion2 == 'restar') {
            if (operacion3 == 'menospormenos') {
                number_end2 *= -operarCadena(numero_a_operar)
                number_end += number_end2
                operacion3 = ''
                number_end2 = ''
            } else {
                number_end -= operarCadena(numero_a_operar)
            }
        }
        let ret = 0;
        if (Math.abs(number_end) - parseInt(Math.abs(number_end)) > 0) {
            let float = 0
            float = number_end - parseInt(number_end)
            float *= 10
            float = float.toFixed(2)
            if (Math.abs(float) - parseInt(Math.abs(float)) > 0) {
                ret = number_end.toFixed(2)
            } else if (float - parseInt(float) == 0) {
                ret = number_end.toFixed(1)
            }
        } else {
            ret = parseInt(number_end)
        }
        result.textContent = ret
        if (result.textContent == 'NaN') {
            result.textContent = ''
            conttecla.textContent = ''
            ret = ''
        }
        conthistory.style.overflowY = "scroll"
        if (changesame == true) {
            ul.innerHTML = `<li>${result.textContent}</li>` + ul.innerHTML
            conthistory.appendChild(ul)
            conttecla = ret
            calculation.innerText = result.textContent
            changesame = false
        } else {
            ul.innerHTML = `<li>${visantres} = ${result.textContent}</li>` + ul.innerHTML
            conthistory.appendChild(ul)
            conttecla = ret
            calculation.innerText = visantres
        }
        let regexboleanm = /^\d*\.+\d*$/gm
        let regexb = regexboleanm.test(result.textContent)
        if (regexb) {
            booleantecladot = false
        }
    }
})

change.addEventListener('click', () => {
    result.textContent *= -1
    conttecla = result.textContent
    changesame = true
})

let operarCadena = (cadenaDisplay) => {
    if (cadenaDisplay == '') {
        return 0
    }
    let ar = cadenaDisplay.split('')
    let ts = 0
    let operacion = "sumar"
    let numero = ''
    for (const caracter of ar) {
        if (caracter == '+') {
            if (operacion == 'sumar') {
                ts += parseFloat(numero)
            } else if (operacion == 'restar') {
                ts -= parseFloat(numero)
            } else if (operacion == 'multiplicar') {
                ts *= parseFloat(numero)
            } else if (operacion = 'dividir') {
                ts /= parseFloat(numero)
            }
            operacion = 'sumar'
            numero = ''
        } else if (caracter == '-') {
            if (numero == '') {
                numero = 0
            }
            if (operacion == 'sumar') {
                ts += parseFloat(numero)
            } else if (operacion == 'restar') {
                ts -= parseFloat(numero)
            } else if (operacion == 'multiplicar') {
                ts *= parseFloat(numero)
            } else if (operacion == 'dividir') {
                ts /= parseFloat(numero)
            }
            operacion = 'restar'
            numero = ''
        } else if (caracter == 'X') {
            if (operacion == 'sumar') {
                ts += parseFloat(numero)
            } else if (operacion == 'restar') {
                ts -= parseFloat(numero)
            } else if (operacion == 'multiplicar') {
                ts *= parseFloat(numero)
            } else if (operacion == 'dividir') {
                ts /= parseFloat(numero)
            }
            operacion = 'multiplicar'
            numero = ''
        } else if (caracter == '/') {
            if (operacion == 'sumar') {
                ts += parseFloat(numero)
            } else if (operacion == 'restar') {
                ts -= parseFloat(numero)
            } else if (operacion == 'multiplicar') {
                ts *= parseFloat(numero)
            } else if (operacion == 'dividir') {
                ts /= parseFloat(numero)
            }
            operacion = 'dividir'
            numero = ''
        } else {
            numero += caracter
        }
    }
    if (operacion == 'sumar') {
        if (!(ar[ar.length - 1] == 'X')) {
            ts += parseFloat(numero)
        }
    } else if (operacion == 'restar') {
        if (!(ar[ar.length - 1] == 'X')) {
            ts -= parseFloat(numero)
        }
    } else if (operacion == 'multiplicar') {
        if (!(ar[ar.length - 1] == 'X')) {
            ts *= parseFloat(numero)
        }
    } else if (operacion == 'dividir') {
        if (!(ar[ar.length - 1] == 'X')) {
            ts /= parseFloat(numero)
        }
    }
    return parseFloat(ts)
}

let boolean = true

conthistory.addEventListener('click', () => {
    if (boolean == true) {
        conthistory.style.height = "140px"
        conthistory.style.marginTop = "100px"
        conthistory.style.backgroundColor = "#888"
        ul.style.backgroundColor = "#888"
        ul.style.color = "#98e0ec"
        boolean = false
    } else {
        conthistory.style.height = "40px"
        conthistory.style.marginTop = "0px"
        conthistory.style.minHeight = ""
        ul.style.outline = ""
        ul.style.backgroundColor = ""
        ul.style.color = "#bfa1b4"
        conthistory.style.backgroundColor = ""
        conthistory.scrollTop = 0
        conthistory.style.scrollBehavior = "smooth"
        boolean = true
        conthistory.style.lineHeight = "40px"
        conthistory.style.fontSize = "20px"
    }
})
