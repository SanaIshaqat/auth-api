'use strict';

let supertest = require('supertest');
const server = require('../src/server');
const mockReq = supertest(server.server);


let users = {
    admin: { username: 'sanaAdmin', password: '0000', role: 'admin' },
    editor: { username: 'sanaEditor', password: '0000', role: 'editor' },
    writer: { username: 'sanaWriter', password: '0000', role: 'writer' },  
    user: { username: 'sanaUser', password: '0000', role: 'user' },
  };


describe('V1 Routes', () => {

  it('can post a new food item', async() => {
    let obj = { name: 'test_food_1', calories: 9999, type: 'FRUIT' };
    let expected = { name: 'test_food_1', calories: 9999, type: 'FRUIT' };

    const response = await mockReq.post('/api/v1/food').send(obj);
    const foodObject = response.body;

    expect(response.status).toBe(201);
    expect(foodObject.id).toBeDefined();
    expect(foodObject.name).toEqual(expected.name)
    Object.keys(expected).forEach(item => {
          expect(foodObject[item]).toEqual(expected[item])
    });
  });

  xit('can get a food item', async() => {
    let obj = { name: 'test_food_2', calories: 9999, type: 'VEGETABLE' };
    let expected = { name: 'test_food_2', calories: 9999, type: 'VEGETABLE' };

    const response = await mockReq.post('/api/v1/food').send(obj);
    const foodObject = response.body;
    const res = await mockReq.get(`/api/v1/food/${foodObject.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(foodObject.id);
    Object.keys(expected).forEach(item => {
          expect(res.body[item]).toEqual(expected[item])
    });
  });

  xit('can get all food items', async() => {
    let obj = { name: 'test_food_3', calories: 9999, type: 'VEGETABLE' };
    let obj2 = { name: 'test_food_4', calories: 9999, type: 'PROTIEN' };

    await mockReq.post('/api/v1/food').send(obj);
    await mockReq.post('/api/v1/food').send(obj2);
    const res = await mockReq.get(`/api/v1/food/`);
    expect(res.status).toBe(200);
    Object.keys(obj).forEach(item => {
          expect(res.body[2][item]).toEqual(obj[item])
    });
    expect(res.body[0].name).toEqual('test_food_1');
    expect(res.body[1].name).toEqual('test_food_2');
    expect(res.body[2].name).toEqual('test_food_3');
    expect(res.body[3].name).toEqual('test_food_4');
   
  });

  it('can update() a food item', async() => {
    let obj = { name: 'test_food_5', calories: 9999, type: 'PROTIEN' };
    let updatedObj = { name: 'test_food_5', calories: 9999, type: 'VEGETABLE' };
    let expected = { name: 'test_food_5', calories: 9999, type: 'VEGETABLE' };

    const response1 = await mockReq.post('/api/v1/food').send(obj);
    const response = await mockReq.put(`/api/v1/food/${response1.body.id}`).send(updatedObj);
    
    expect(response.status).toBe(200);
    
    Object.keys(expected).forEach(item => {
      expect(response.body[item]).toEqual(expected[item])
    });
    
  });

  it('can delete() a food item', async() => {
    let obj = { name: 'test_food_6', calories: 9999, type: 'VEGETABLE' };
    let expected = { name: 'test_food_6', calories: 9999, type: 'VEGETABLE' };
    const response1 = await mockReq.post('/api/v1/food').send(obj);
    const response2 = await mockReq.delete(`/api/v1/food/${response1.body.id}`);
    expect(response2.status).toBe(200);
   
    });
  });