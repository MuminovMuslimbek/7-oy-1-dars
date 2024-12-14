import React, { useEffect, useRef, useState } from 'react';
import Logo from './assets/logo.svg';
import Doted from './assets/dotDotDot.svg';
import Edit from './assets/Edit.svg';
import Basket from './assets/basket.svg';

function App() {
  const name = useRef(null);
  const tel = useRef(null);
  const rate = useRef(null);
  const balance = useRef(null);
  const deposit = useRef(null);
  const description = useRef(null);
  const [cheked, setCheked] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let getLocal = localStorage.getItem('user');
    if (getLocal) {
      setData(JSON.parse(getLocal));
    }
  }, []);

  function validate() {
    if (!name.current.value) {
      alert('Iltimos name ni kiriting!!');
      name.current.focus();
      return false;
    }
    if (!tel.current.value) {
      alert('Iltimos tel ni kiriting!!');
      tel.current.focus();
      return false;
    }
    if (!rate.current.value) {
      alert('Iltimos rate ni kiriting!!');
      rate.current.focus();
      return false;
    }
    if (!balance.current.value) {
      alert('Iltimos balance ni kiriting!!');
      balance.current.focus();
      return false;
    }
    if (!deposit.current.value) {
      alert('Iltimos deposit ni kiriting!!');
      deposit.current.focus();
      return false;
    }
    if (!cheked) {
      alert('Iltimos status ni tanlang!!');
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    let isValid = validate();
    if (!isValid) {
      return;
    }

    let user = {
      id: Date.now(),
      name: name.current.value,
      tel: tel.current.value,
      rate: rate.current.value,
      balance: balance.current.value,
      deposit: deposit.current.value,
      description: description.current.value,
      cheked: cheked,
    };

    let newData = [...data, user];
    setData(newData);
    localStorage.setItem('user', JSON.stringify(newData));
    console.log(user);

    name.current.value = '';
    tel.current.value = '';
    rate.current.value = '';
    balance.current.value = '';
    deposit.current.value = '';
    description.current.value = '';
    setCheked('');

    document.getElementById('my_modal_1').close();
  }

  function handleDelete(id) {
    const newData = data.filter((item) => item.id !== id);
    let isDelete = confirm('Rostdan ham o`chirmoqchimisiz??')
    if (isDelete) {
      setData(newData);
      localStorage.setItem('user', JSON.stringify(newData));
    }
  }

  return (
    <>
      <div className="bg-[#F4F7FC] py-4">
        <div className="max-w-[1200px] w-full mx-auto flex justify-between">
          <a href="../index.html">
            <img src={Logo} className="h-full w-[30px]" alt="Logo" />
          </a>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="input input-bordered w-full max-w-sm bg-[#DAE1EC] text-[#2E3B52] placeholder:text-[#2E3B52]"
            type="search"
            placeholder="Search by name.."
          />
          <button
            onClick={() => document.getElementById('my_modal_1').showModal()}
            className="btn bg-[#0A65FF] text-white border-0"
          >
            Add Customer
          </button>
        </div>
        <table className="max-w-[1200px] w-full mx-auto select-none mt-[30px]">
          <thead>
            <tr className="text-[#606F89] uppercase text-[12px] font-semibold flex justify-between items-center">
              <th className="w-[3%]">
                <input type="checkbox" className="checkbox border-[#6F809E]" />
              </th>
              <th className="w-[3%]">name</th>
              <th>description</th>
              <th className="w-[3%]">Rate</th>
              <th className="w-[1%]">balance</th>
              <th className="w-[1%]">Deposit</th>
              <th className="w-[17%]">Status</th>
              <th className="cursor-pointer">
                <img src={Doted} alt="Options" />
              </th>
            </tr>
          </thead>
        </table>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit} className="flex select-none flex-col items-center gap-[15px]">
              <h1>Add User From Menu</h1>
              <input
                ref={name}
                className="input w-full border-[#F4F7FC]"
                type="text"
                placeholder="Enter name.."
              />
              <input
                ref={tel}
                className="input w-full border-[#F4F7FC]"
                type="tel"
                placeholder="Enter number.."
              />
              <input
                ref={rate}
                className="input w-full border-[#F4F7FC]"
                type="number"
                placeholder="Enter rate.."
              />
              <input
                ref={balance}
                className="input w-full border-[#F4F7FC]"
                type="number"
                placeholder="Enter balance.."
              />
              <input
                ref={deposit}
                className="input w-full border-[#F4F7FC]"
                type="number"
                placeholder="Enter deposit.."
              />
              <textarea
                ref={description}
                className="textarea textarea-bordered w-full"
                placeholder="Enter description.."
              ></textarea>
              <div className="flex gap-[15px]">
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-[15px]">
                    <span className="label-text">Active</span>
                    <input
                      value="active"
                      onChange={() => setCheked('active')}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-[15px]">
                    <span className="label-text">Inactive</span>
                    <input
                      value="inactive"
                      onChange={() => setCheked('inactive')}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red-500"
                    />
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-outline w-full uppercase mx-auto">
                add user
              </button>
            </form>
          </div>
        </dialog>
      </div>

      <table className="w-full mx-auto select-none flex flex-col">
        {data &&
          data.map((value, index) => (
            <tbody
              key={index}
              className={`w-full ${value.cheked === 'active' ? 'bg-[#F4F7FC]' : 'bg-[#fff]'} `}
            >
              <tr className="text-[#606F89] max-w-[1220px] w-full mx-auto text-[12px] font-semibold flex justify-between items-center">
                <td className="w-[1%] p-4">
                  <input type="checkbox" className="checkbox border-[#6F809E]" />
                </td>
                <td className="w-[1%]">
                  <span className="text-[18px] text-[#000]">
                    {value.name}
                  </span>{' '}
                  {value.tel}
                </td>
                <td className="w-[7%] text-ellipsis line-clamp-3">
                  {value.description}
                </td>
                <td className="w-[1%] text-[14px]">
                  {value.rate}.00 <span className="text-[#606F89]">INR</span>
                </td>
                <td className="w-[1%] text-[14px]">
                  <span
                    className={
                      parseFloat(value.balance) < 0
                        ? 'text-red-500'
                        : 'text-green-500'
                    }
                  >
                    {value.balance}.00
                  </span>{' '}
                  <span className="text-[#606F89]">INR</span>
                </td>
                <td className="w-[3%] text-[14px]">
                  {value.deposit}.00 <span className="text-[#606F89]">INR</span>
                </td>
                <td>
                  {value.cheked === 'active' ? (
                    <button className="uppercase py-[7px] px-[10px] bg-[#0A65FF] text-[10px] text-white rounded-md">
                      active
                    </button>
                  ) : (
                    <button className="uppercase py-[7px] px-[10px] border rounded-md border-[#606F89] text-[10px] text-[#606F89]">
                      inactive
                    </button>
                  )}
                </td>
                <td className="flex justify-between gap-[17px] items-center">
                  <button>
                    <img src={Edit} />
                  </button>
                  <button onClick={() => handleDelete(value.id)}>
                    <img src={Basket} />
                  </button>
                  <img src={Doted} />
                </td>
              </tr>
            </tbody>
          ))}
      </table>

      <footer className="bg-white py-[15px] absolute bottom-0 w-full text-[#2E3B52]">
        <div className="max-w-[1200px] w-full mx-auto flex justify-between">
          <p>active customers: {data.length}</p>
          <p>Rows per page: 0</p>
          <p>1 of 1</p>
        </div>
      </footer>
    </>
  );
}

export default App;
