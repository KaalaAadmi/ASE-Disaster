import { addCard, noRoutes } from './reroute';

describe('addCard', () => {
  it('should create a new card with the specified id, element, clear, and detail', () => {
    const id = 1;
    const clear = true;
    const detail = 'some detail';
    const element = document.createElement('div');
    
    addCard(id, element, clear, detail);
    
    expect(element.children.length).toBe(1);
    expect(element.children[0].className).toBe('card');
    expect(element.children[0].children[0].className).toBe('card-header route-found');
    expect(element.children[0].children[1].className).toBe('card-details');
    expect(element.children[0].children[1].innerHTML).toBe('This some detail obstacles.');
  });
});

describe('noRoutes', () => {
  it('should create a new card indicating no routes found', () => {
    const element = document.createElement('div');

    noRoutes(element);

    expect(element.children.length).toBe(1);
    expect(element.children[0].className).toBe('card');
    expect(element.children[0].children[0].className).toBe('card-header no-route');
    expect(element.children[0].children[1].className).toBe('card-details');
  });
});
