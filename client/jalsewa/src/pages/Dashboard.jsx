import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { Button, Table } from 'flowbite-react';
import { loadStripe } from '@stripe/stripe-js'

export default function Dashboard() {

  const itemName = "Water Bill Payment";
  const { user } = useContext(UserContext);
  const currentDate = new Date();
  const reading = 746;
  const minimumCharge = 100.00;
  const sewerageCharge = 50.00;
  const additionalCharge = 0.00;

  const [totalCharge, setTotalCharge] = useState(0);

  useEffect(() => {
    if (user) {
      setTotalCharge(user.amount + minimumCharge + sewerageCharge + additionalCharge);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      setTotalCharge(0);
    }, 10000);

    const stripe = await loadStripe("pk_test_51PHVYA042m08iRpKNn5LQLY4DH5eWBe1RBNC8AFERTCReijYbTWWwh4VFRCgmC5ulkZtD0BQBtnfvFZdhWT9V3dT00eyJR1r1c")
    try {
      const res = await fetch("http://localhost:3000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [
            {
              id: 1,
              price: totalCharge,
              name: itemName
            }
          ]
        })
      })
      const session = await res.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id
      })

      if (result.error) {
        console.log(result.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mt-5">
      {user && (
        <div className='flex flex-col justify-center items-center bg-slate-300 w-3/12 mx-auto py-10 px-5 rounded-lg'>
          <h1 className='text-3xl font-bold mb-3'>{user.username}</h1>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell className='font-semibold'>Customer Id:</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className='font-semibold'>Reading Date:</Table.Cell>
                <Table.Cell>{`${currentDate.getFullYear()} / ${currentDate.getMonth() + 1} / ${currentDate.getDate()}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className='font-semibold'>Current Reading:</Table.Cell>
                <Table.Cell>{reading} KL</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className='font-semibold'>Minimum Charges:</Table.Cell>
                <Table.Cell>{minimumCharge}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className='font-semibold'>Additional Charges:</Table.Cell>
                <Table.Cell>{additionalCharge}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className='font-semibold'>Sewerage Charges:</Table.Cell>
                <Table.Cell>{sewerageCharge}</Table.Cell>
              </Table.Row>
              <Table.Row className='text-lg font-bold text-black'>
                <Table.Cell>Total Amount:</Table.Cell>
                <Table.Cell>{`Rs. ${totalCharge}`}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button type='submit' className='mt-5 w-full' gradientDuoTone='purpleToBlue' onClick={handleSubmit}>Pay with Stripe</Button>
        </div>
      )}
    </div>
  )
}
