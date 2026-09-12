// 自动保存 + 点击正文直接编辑 + 工具栏常驻
let saveTimer = null
const noteContent = document.getElementById('noteContent')
const toolbar = document.querySelector('.toolbar')

// 工具栏永久显示，不会消失
toolbar.style.display = 'block'

// 点击正文直接进入编辑模式
noteContent.addEventListener('click', ()=>{
  noteContent.contentEditable = true
  noteContent.focus()
})

// 自动保存：内容变化延迟保存
noteContent.addEventListener('input', ()=>{
  clearTimeout(saveTimer)
  saveTimer = setTimeout(()=>{
    autoSaveNote()
  }, 800)
})

function autoSaveNote(){
  const noteData = {
    title: document.getElementById('noteTitle').value,
    content: noteContent.innerHTML
  }
  const fs = require('fs')
  const os = require('os')
  const savePath = path.join(app.getPath('userData'), 'notes.json')
  let allNotes = []
  try{
    if(fs.existsSync(savePath)){
      allNotes = JSON.parse(fs.readFileSync(savePath,'utf8'))
    }
  }catch(e){}
  allNotes.push(noteData)
  fs.writeFileSync(savePath, JSON.stringify(allNotes,null,2))
}

// 关闭窗口前强制保存
window.addEventListener('beforeunload',()=>{
  clearTimeout(saveTimer)
  autoSaveNote()
})
