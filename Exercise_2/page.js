number_buttons = document.querySelectorAll("button.number_button","button.operator");
result_input = document.querySelector('button.result')
reset_button = document.querySelector('button.reset_button')
let equation = document.getElementsByClassName('equation')[0]

number_buttons.forEach((x) => {
    x.addEventListener('click',(event) => {
        let operation = document.getElementsByTagName('input')[0]
        chosen_number = x.innerText
        operation.value += chosen_number
    })
})

result_input.addEventListener('click', (event) => {
    if(equation.value.includes('x')){
        equation.value = equation.value.replace(/x/g, '*')
    }

    let final_result = math.evaluate(equation.value)
    equation.value = final_result
})

reset_button.addEventListener('click',(event) =>{
    equation.value = ''
})