import React, { useState } from "react";
import { Badge, Button, Card, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import currencyCodes from '../data/data.json'
import HomeBankingService from "../api/home-banking/HomeBankingService";
export default function CurrencyConvertor() {

  const { register, handleSubmit } = useForm();
  const [ convertedMoney,setConvertedMoney ] = useState(null)
  const onSubmit = data => HomeBankingService.convertMoney('USD',data.currency,data.amount)
      .then(result => setConvertedMoney(result.data.totalCalculatedAmount))
    return (
      <Card>
      <Card.Header>Convert Money</Card.Header>
      <Card.Body>
      <Form inline onSubmit= {handleSubmit(onSubmit)}>
      <Form.Label htmlFor="amount" srOnly>Amount:(USD)</Form.Label>
      <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>$</InputGroup.Text>
    </InputGroup.Prepend>
    <Form.Control name="amount"
        ref={register} 
        type="number"
        id="amount"
        value="1"
        placeholder="0"
      />
  </InputGroup>

      <Form.Control as="select" name="currency" ref={register} required>
      <option value="" hidden>Choose Currency</option>
        {
          currencyCodes.map(a => (
            <option key={a.currency} value={a.code}>{a.currency} | {a.code}</option>
          )
          )
        }
      </Form.Control>
        <Button type="submit">Convert</Button>
   
        { convertedMoney && (
          <h2><Badge className="ml-2"  variant="success">{convertedMoney}</Badge></h2>
        )}
      </Form>
      </Card.Body>
      </Card>
    );
  }