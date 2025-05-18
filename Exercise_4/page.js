let friend_tab = (name, age, image) => `
    <div class="friend_widget shrink">
        <div>
            <p class='name profile_info'>${name}  ${age}</p>
            <div class="buttons" style="display: flex; flex-direction: row;">
                <i class="fa-solid fa-trash widget_button remove_button"></i>
                <i class="fa-regular fa-star widget_button star_button"></i>
            </div>
        </div><br>
        <input type="image" src="${image}" alt="" class="profile_picture">
    </div>
`;
let friend_list = document.querySelector('div.friend_list')
let best_friend_list = document.getElementsByClassName('best_friend_list')[0]
let submit_button = document.querySelector('button.submit_button')

class CreateFriendTab extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        const name = this.getAttribute('name') || 'Unknown';
        const age = this.getAttribute('age') || 'N/A';
        const image = this.getAttribute('image') || 'https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png';
        this.innerHTML = friend_tab(name, age, image);

        let remove_button = this.getElementsByClassName('remove_button')[0]
        remove_button.addEventListener('mouseup',(event)=>{
            this.classList.add('shrink')
            setTimeout(() => {
                this.remove()},1000)

        })

        let star_button = this.getElementsByClassName('fa-star')[0]

        star_button.addEventListener('mouseup',(event) => {
            if (star_button.classList.contains('fa-regular')) {
                change_friend_list(best_friend_list,this,star_button)
            } else {
                change_friend_list(friend_list,this)
            }
        });

    }
}

function change_friend_list(list,item,star_button){
    let old_wid = item.querySelector('.friend_widget')
    
    requestAnimationFrame(() => {
        old_wid.classList.add('shrink')
        old_wid.classList.remove('enlarge')
    })

    setTimeout(() => {
        list.appendChild(item);

        let new_wid = item.querySelector('.friend_widget');

        setTimeout(() => {
            new_wid.classList.add('enlarge');
            new_wid.classList.remove('shrink');
        }, 500)


        if (star_button) {
            let star_but = item.querySelector('.friend_widget .buttons .star_button');
            star_but.classList.replace('fa-regular', 'fa-solid');
        } else {
            let star_but = item.querySelector('.friend_widget .buttons .star_button');
            star_but.classList.replace('fa-solid', 'fa-regular');
        }
    }, 500);
}

window.customElements.define('friend-widget',CreateFriendTab)

submit_button.addEventListener('mouseup',(event) => {
    let age = document.getElementById("age").value
    let name = document.getElementById("name").value
    let imageInput = document.getElementById("image");
    let imageFile = imageInput.files[0];

    let new_friend = document.createElement('friend-widget')

    new_friend.setAttribute('name', name);
    new_friend.setAttribute('age', age);
    if (imageFile){
        let imageURL = URL.createObjectURL(imageFile);
        new_friend.setAttribute('image', imageURL);
    }

    friend_list.appendChild(new_friend);
    
    requestAnimationFrame(() => {
        let widgetDiv = new_friend.querySelector('.friend_widget');
        widgetDiv.classList.remove('shrink');
        widgetDiv.classList.add('enlarge');
    });

})

