
const template    =  document.querySelector('#template').content
const formulario  =  document.querySelector('#formulario')
const listTarea   =  document.querySelector('#content')
const fragment    =  document.createDocumentFragment()
const input       =  document.querySelector('#input')

let tasks = {}


document.addEventListener('DOMContentLoaded',()=>{
  if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks')) 
  }
  pintarTarea()
 
})

listTarea.addEventListener('click',(e)=>{
   btnAction(e)
})

formulario.addEventListener('submit',(e)=>{
   e.preventDefault();
   //e.target[0].value otra forma de optener data del formulario
   setTarea(e);
})

const setTarea = (e) => {
  if(input.value.trim() ===""){
    return 
  }
  let tarea = {
    id:Date.now(),
    texto:input.value,
    estado:false
  }
  tasks[tarea.id] = {...tarea}
  
  input.focus()
  formulario.reset()
  pintarTarea()
}
 
const pintarTarea = () => {
  localStorage.setItem('tasks',JSON.stringify(tasks))
  if(Object.values(tasks).length===0){
    listTarea.innerHTML=`<div class="alert alert-danger text-center">No hay tareas😍 </div>`
    return
  }

   listTarea.innerHTML=""
   Object.values(tasks).forEach(task => {
     let clone = template.cloneNode(true)
      clone.querySelector("p").textContext = task.texto
      if(task.estado){
        clone.querySelector('.alert').classList.replace('alert-warning','alert-success')
        clone.querySelectorAll('i')[0].classList.replace('fa-check-circle','fa-undo-alt')
        clone.querySelector("p").textContext = task.texto + "fue realizada"
        clone.querySelector("p").style.textDecoration="line-through"
      }
      clone.querySelector('span').textContext="jajaj"
      clone.querySelectorAll('.text-danger')[0].dataset.id  = task.id
      clone.querySelectorAll('.text-success')[0].dataset.id = task.id
      
    
      fragment.appendChild(clone)

   });
   listTarea.appendChild(fragment)
}

const btnAction = (e)=>{
  if(e.target.classList.contains('text-danger')){
      let respose = Object.values(tasks).find(t=>t.id==e.target.dataset.id)
      delete tasks[respose.id] 
    
      pintarTarea()
  }

  if(e.target.classList.contains('text-success')){
    tasks[e.target.dataset.id].estado =  ! tasks[e.target.dataset.id].estado 
    pintarTarea()
  }
 
}

