import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [newValue, setNewValue] = useState("");

  const [list, setList] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(list))
  }, [list])




  const handleSubmit = (e) => {
    e.preventDefault();
    {
      setNewValue("")
      setList([...list,
      {
        text: newValue,
        id: crypto.randomUUID(),
        com: false
      }])
    }
  }

  const toggleItem = (id, com) => {
    console.log(com, id)
    setList(currentList => {
      return currentList.map(item => {
        if (item.id == id) {
          item.com = !com;
        }

        return item
      })
    })
  }

  const deleteItem = (id) => {
    setList(currentList => {
      return currentList.filter(item => item.id != id)
    })
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h1>To Do List</h1>
        <input
          type="text"
          value={newValue}
          onChange={(e) => { setNewValue(e.target.value) }} />
        <button type='submit'>+</button>
      </form>

      <div className='list'>
        {list.map(item => {
          return (
            <li
              key={crypto.randomUUID()}
              id={item.id}
              className={item.com && "completed"}>
              <div
                className="text"
                onClick={(e) => {
                  toggleItem(
                    item.id,
                    //e.target.closest("li").className == "completed")
                    item.com)
                }}>{item.text}</div>
              <div
                className="delete"
                onClick={() => { deleteItem(item.id) }}>+</div></li>
          )
        })}
      </div>
    </>
  )
}

export default App
