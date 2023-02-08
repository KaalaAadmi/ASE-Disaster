
//reroute report
export let counter = 0;
export const maxAttempts = 50;
export let emoji = '';
export let collision = '';
export let detail = '';
export const reports = document.getElementById('reports');

export function addCard(id, element, clear, detail) {
  const card = document.createElement('div');
  card.className = 'card';
  // Add the response to the individual report created above
  const heading = document.createElement('div');
  // Set the class type based on clear value
  heading.className =
    clear === true ? 'card-header route-found' : 'card-header obstacle-found';
  heading.innerHTML =
    id === 0
      ? `${emoji} The route ${collision}`
      : `${emoji} Route ${id} ${collision}`;

  const details = document.createElement('div');
  details.className = 'card-details';
  details.innerHTML = `This ${detail} obstacles.`;

  card.appendChild(heading);
  card.appendChild(details);
  element.insertBefore(card, element.firstChild);
}

export function noRoutes(element) {
  const card = document.createElement('div');
  card.className = 'card';
  // Add the response to the individual report created above
  const heading = document.createElement('div');
  heading.className = 'card-header no-route';
  emoji = '🛑';
  heading.innerHTML = `${emoji} Ending search.`;

  // Add details to the individual report
  const details = document.createElement('div');
  details.className = 'card-details';
  details.innerHTML = `No clear route found in ${counter} tries.`;

  card.appendChild(heading);
  card.appendChild(details);
  element.insertBefore(card, element.firstChild);
}
