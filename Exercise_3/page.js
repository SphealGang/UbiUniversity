let man_range = document.getElementsByClassName('man_age')[0]
let man_p = document.getElementsByClassName('man_value')[0]
let age_p = document.getElementsByClassName('age')[0]
let gender = document.getElementsByName('gender')
let allhideableElements = Array.from(document.getElementsByClassName('hideable'))

let male_image_list = [
    'images/baby_m.png',
    'images/kid_m.png',
    'images/teen_m.png',
    'images/adult_m.png',
    'images/elder_m.png',
    ]

let female_image_list = [
    'images/baby_f.png',
    'images/kid_f.png',
    'images/teen_f.png',
    'images/adult_f.png',
    'images/elder_f.png',
    ]

gender.forEach(x => {
    x.addEventListener('input', (event) => {
        if (!allhideableElements.some(x => x.classList.contains('hide_UI'))){
            man_range.dispatchEvent(new Event('mouseup'));
        }

        allhideableElements.forEach(y => {
            if (y.classList.contains('hide_UI')){
                y.classList.add('enlarge');
                setTimeout(() => {
                    y.classList.remove('shrink')
                    y.classList.remove('enlarge')
                    y.classList.remove('hide_UI')
                },1000)
            }
        });

    });
});

man_range.addEventListener("mouseup", (event) => {
    let range_value = man_range.value;
    let selectedGender = Array.from(gender).find(x => x.checked)?.value;
    let image_list = []

    switch (true){
        case (selectedGender == 'female'):
            image_list = female_image_list
            break
        case (selectedGender == 'male'):
            image_list = male_image_list
            break
        default:
            window.alert("Please select a gender");
            return
};

function change_image(new_image){
    let existing_image = man_p;

    if (existing_image) {
        if (existing_image.src.endsWith(new_image)){
            return
        }
        else{
            man_range.disabled = true
            existing_image.classList.add('shrink');
            setTimeout(() => {
                existing_image.src = new_image;
                existing_image.classList.remove('shrink');
                existing_image.classList.add('enlarge');
                man_range.disabled = false
            },1500)
            setTimeout(() => {
                existing_image.classList.remove('enlarge')
            },2000)
        }
            

    }
};

switch (true){
    case (range_value <= 4):
        change_image(image_list[0]);
        break;
    case (range_value > 4 && range_value <= 14):
        change_image(image_list[1]);
        break;
    case (range_value > 14 && range_value <= 20):
        change_image(image_list[2]);
        break;
    case (range_value > 20 && range_value <= 60):
        change_image(image_list[3]);
        break;
    case (range_value > 60):
        change_image(image_list[4]);
        break;
    }
});

man_range.addEventListener('input', (event) => {
    let range_value = man_range.value;
    age_p.innerHTML = range_value
});