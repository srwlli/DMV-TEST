/**
 * Ohio Road Signs - Complete Reference
 * 107 signs organized by type
 */

const ROAD_SIGNS = [
  // Regulatory Signs (45)
  {
    id: 'sign-reg-001',
    name: 'Stop Sign',
    type: 'regulatory',
    emoji: '🛑',
    description: 'Red octagon-shaped sign',
    meaning: 'Come to a complete stop and check for traffic before proceeding. You must yield to all vehicles and pedestrians.'
  },
  {
    id: 'sign-reg-002',
    name: 'Yield Sign',
    type: 'regulatory',
    emoji: '⚠️',
    description: 'Red and white triangle with point down',
    meaning: 'Slow down and be ready to stop if traffic does not allow safe passage. Yield to all vehicles and pedestrians.'
  },
  {
    id: 'sign-reg-003',
    name: 'Speed Limit 25',
    type: 'regulatory',
    emoji: '📍',
    description: 'White rectangular sign with black text',
    meaning: 'The maximum legal speed on this road is 25 mph. Do not exceed this speed.'
  },
  {
    id: 'sign-reg-004',
    name: 'Speed Limit 35',
    type: 'regulatory',
    emoji: '📍',
    description: 'White rectangular sign with black text',
    meaning: 'The maximum legal speed on this road is 35 mph. Do not exceed this speed.'
  },
  {
    id: 'sign-reg-005',
    name: 'Speed Limit 45',
    type: 'regulatory',
    emoji: '📍',
    description: 'White rectangular sign with black text',
    meaning: 'The maximum legal speed on this road is 45 mph. Do not exceed this speed.'
  },
  {
    id: 'sign-reg-006',
    name: 'Speed Limit 55',
    type: 'regulatory',
    emoji: '📍',
    description: 'White rectangular sign with black text',
    meaning: 'The maximum legal speed on this road is 55 mph. Do not exceed this speed.'
  },
  {
    id: 'sign-reg-007',
    name: 'Speed Limit 65',
    type: 'regulatory',
    emoji: '📍',
    description: 'White rectangular sign with black text',
    meaning: 'The maximum legal speed on this road is 65 mph. Do not exceed this speed.'
  },
  {
    id: 'sign-reg-008',
    name: 'Speed Limit 70',
    type: 'regulatory',
    emoji: '📍',
    description: 'White rectangular sign with black text',
    meaning: 'The maximum legal speed on this road is 70 mph. Do not exceed this speed.'
  },
  {
    id: 'sign-reg-009',
    name: 'One Way',
    type: 'regulatory',
    emoji: '➡️',
    description: 'White rectangular sign with arrow',
    meaning: 'Traffic flows only in the direction shown by the arrow. Do not travel against the arrow.'
  },
  {
    id: 'sign-reg-010',
    name: 'Do Not Enter',
    type: 'regulatory',
    emoji: '🚫',
    description: 'Red rectangular sign with white text',
    meaning: 'Do not enter. You may be on a one-way road going the wrong direction or a divided highway.'
  },
  {
    id: 'sign-reg-011',
    name: 'Wrong Way',
    type: 'regulatory',
    emoji: '↩️',
    description: 'Red and white sign',
    meaning: 'You are going the wrong way. Turn around immediately at a safe location.'
  },
  {
    id: 'sign-reg-012',
    name: 'No Parking',
    type: 'regulatory',
    emoji: '⛔',
    description: 'White sign with red circle and slash',
    meaning: 'Parking is prohibited in this area. Violators may be ticketed or towed.'
  },
  {
    id: 'sign-reg-013',
    name: 'No Passing',
    type: 'regulatory',
    emoji: '🚷',
    description: 'Yellow sign with red "No Passing" text',
    meaning: 'Do not pass other vehicles in this area. It is unsafe to pass.'
  },
  {
    id: 'sign-reg-014',
    name: 'No U-Turn',
    type: 'regulatory',
    emoji: '🚫',
    description: 'White sign with red circle and U arrow',
    meaning: 'U-turns are not allowed in this area.'
  },
  {
    id: 'sign-reg-015',
    name: 'No Left Turn',
    type: 'regulatory',
    emoji: '🚫',
    description: 'White sign with red circle and left arrow',
    meaning: 'Left turns are not allowed in this area.'
  },
  {
    id: 'sign-reg-016',
    name: 'No Right Turn',
    type: 'regulatory',
    emoji: '🚫',
    description: 'White sign with red circle and right arrow',
    meaning: 'Right turns are not allowed in this area.'
  },
  {
    id: 'sign-reg-017',
    name: 'Divided Highway Begins',
    type: 'regulatory',
    emoji: '🔀',
    description: 'Black and white divided circle sign',
    meaning: 'The highway ahead is divided. Oncoming traffic will be separated by a median.'
  },
  {
    id: 'sign-reg-018',
    name: 'Divided Highway Ends',
    type: 'regulatory',
    emoji: '🔀',
    description: 'Black and white merged circle sign',
    meaning: 'The divided highway is ending. Be prepared for oncoming traffic.'
  },
  {
    id: 'sign-reg-019',
    name: 'Keep Right',
    type: 'regulatory',
    emoji: '➡️',
    description: 'White sign with arrow pointing right',
    meaning: 'Keep to the right side of the road. Do not go left of this sign.'
  },
  {
    id: 'sign-reg-020',
    name: 'Keep Left',
    type: 'regulatory',
    emoji: '⬅️',
    description: 'White sign with arrow pointing left',
    meaning: 'Keep to the left side of the road. Do not go right of this sign.'
  },
  {
    id: 'sign-reg-021',
    name: 'Do Not Block Intersection',
    type: 'regulatory',
    emoji: '⚠️',
    description: 'White sign with red border',
    meaning: 'Do not enter the intersection if you cannot clear it. Wait until traffic ahead clears.'
  },
  {
    id: 'sign-reg-022',
    name: 'Reserved Parking',
    type: 'regulatory',
    emoji: '♿',
    description: 'White sign with wheelchair symbol in blue',
    meaning: 'This parking space is reserved for disabled persons. Unauthorized use may result in a fine.'
  },
  {
    id: 'sign-reg-023',
    name: 'No Littering',
    type: 'regulatory',
    emoji: '🚯',
    description: 'White rectangular sign',
    meaning: 'Do not litter. Throwing trash is illegal and harmful to the environment.'
  },
  {
    id: 'sign-reg-024',
    name: 'Truck Route',
    type: 'regulatory',
    emoji: '🚚',
    description: 'White sign with truck symbol',
    meaning: 'This is a designated truck route. Trucks should follow this path.'
  },
  {
    id: 'sign-reg-025',
    name: 'No Trucks',
    type: 'regulatory',
    emoji: '🚷',
    description: 'White sign with red circle and truck symbol',
    meaning: 'Trucks are not allowed on this road.'
  },
  {
    id: 'sign-reg-026',
    name: 'Height Limit',
    type: 'regulatory',
    emoji: '📏',
    description: 'White sign showing feet and inches',
    meaning: 'Vehicles taller than the height shown cannot pass under this structure.'
  },
  {
    id: 'sign-reg-027',
    name: 'Weight Limit',
    type: 'regulatory',
    emoji: '⚖️',
    description: 'White sign showing weight limit',
    meaning: 'Vehicles heavier than the weight shown are not allowed on this road.'
  },
  {
    id: 'sign-reg-028',
    name: 'School Zone Speed Limit 15',
    type: 'regulatory',
    emoji: '🏫',
    description: 'Yellow and black sign',
    meaning: 'The speed limit in this school zone is 15 mph during school hours.'
  },
  {
    id: 'sign-reg-029',
    name: 'No Bicycles',
    type: 'regulatory',
    emoji: '🚷',
    description: 'White sign with red circle and bicycle',
    meaning: 'Bicycles are not allowed in this area.'
  },
  {
    id: 'sign-reg-030',
    name: 'No Pedestrians',
    type: 'regulatory',
    emoji: '🚷',
    description: 'White sign with red circle and pedestrian',
    meaning: 'Pedestrians are not allowed in this area.'
  },
  {
    id: 'sign-reg-031',
    name: 'All-Way Stop',
    type: 'regulatory',
    emoji: '🛑',
    description: 'Stop sign with "All Way" text',
    meaning: 'All traffic directions must stop. Proceed in order of arrival, or yield to the right.'
  },
  {
    id: 'sign-reg-032',
    name: 'Do Not Block Drive',
    type: 'regulatory',
    emoji: '⚠️',
    description: 'White sign with red border',
    meaning: 'Do not park or stand in front of this driveway entrance.'
  },
  {
    id: 'sign-reg-033',
    name: 'Turn on Red Prohibited',
    type: 'regulatory',
    emoji: '🚫',
    description: 'White sign with red circle',
    meaning: 'Do not turn right on red at this intersection. Wait for a green arrow.'
  },
  {
    id: 'sign-reg-034',
    name: 'Must Turn Right',
    type: 'regulatory',
    emoji: '➡️',
    description: 'White sign with right arrow',
    meaning: 'You must turn right. Going straight is not allowed.'
  },
  {
    id: 'sign-reg-035',
    name: 'Must Turn Left',
    type: 'regulatory',
    emoji: '⬅️',
    description: 'White sign with left arrow',
    meaning: 'You must turn left. Going straight is not allowed.'
  },
  {
    id: 'sign-reg-036',
    name: 'Straight Only',
    type: 'regulatory',
    emoji: '⬆️',
    description: 'White sign with upward arrow',
    meaning: 'Go straight only. Turning is not allowed in this lane.'
  },
  {
    id: 'sign-reg-037',
    name: 'Pay Toll',
    type: 'regulatory',
    emoji: '💰',
    description: 'White sign indicating toll ahead',
    meaning: 'You must pay a toll to use this road or bridge.'
  },
  {
    id: 'sign-reg-038',
    name: 'Reversible Lane',
    type: 'regulatory',
    emoji: '🔀',
    description: 'White or yellow sign',
    meaning: 'Lane direction changes at different times. Check electronic signs for current direction.'
  },
  {
    id: 'sign-reg-039',
    name: 'HOV Lane',
    type: 'regulatory',
    emoji: '🚗',
    description: 'White sign with carpool symbol',
    meaning: 'High Occupancy Vehicle lane. Only vehicles with the required number of occupants can use this lane.'
  },
  {
    id: 'sign-reg-040',
    name: 'Carpool/HOV 2+ Occupants',
    type: 'regulatory',
    emoji: '👥',
    description: 'White sign with occupancy requirement',
    meaning: 'This lane is for vehicles with 2 or more occupants (driver plus 1 or more passengers).'
  },
  {
    id: 'sign-reg-041',
    name: 'Carpool/HOV 3+ Occupants',
    type: 'regulatory',
    emoji: '👥👥',
    description: 'White sign with occupancy requirement',
    meaning: 'This lane is for vehicles with 3 or more occupants (driver plus 2 or more passengers).'
  },
  {
    id: 'sign-reg-042',
    name: 'No Stopping Anytime',
    type: 'regulatory',
    emoji: '⛔',
    description: 'Red and white sign',
    meaning: 'Do not stop in this area at any time, including to load or unload passengers.'
  },
  {
    id: 'sign-reg-043',
    name: 'No Standing Anytime',
    type: 'regulatory',
    emoji: '⛔',
    description: 'Red and white sign',
    meaning: 'Do not stop and wait in this area. Only brief loading/unloading is allowed.'
  },
  {
    id: 'sign-reg-044',
    name: 'Bus Stop',
    type: 'regulatory',
    emoji: '🚌',
    description: 'White sign with bus symbol',
    meaning: 'Buses stop here. Do not park or stand in this area during posted hours.'
  },
  {
    id: 'sign-reg-045',
    name: 'Taxi Stand',
    type: 'regulatory',
    emoji: '🚕',
    description: 'White sign with taxi symbol',
    meaning: 'Taxi stand. Do not park or stand in this area. It is reserved for taxis.'
  },

  // Warning Signs (51)
  {
    id: 'sign-warn-001',
    name: 'Pedestrian Crossing',
    type: 'warning',
    emoji: '🚶',
    description: 'Yellow diamond with pedestrian figure',
    meaning: 'Pedestrians may cross the road ahead. Be prepared to stop.'
  },
  {
    id: 'sign-warn-002',
    name: 'School Crossing',
    type: 'warning',
    emoji: '🏫',
    description: 'Yellow diamond with children figures',
    meaning: 'School area ahead. Children may be crossing. Reduce speed.'
  },
  {
    id: 'sign-warn-003',
    name: 'Curve Right',
    type: 'warning',
    emoji: '↗️',
    description: 'Yellow diamond with curved arrow right',
    meaning: 'Curve in road to the right ahead. Reduce speed and stay in your lane.'
  },
  {
    id: 'sign-warn-004',
    name: 'Curve Left',
    type: 'warning',
    emoji: '↖️',
    description: 'Yellow diamond with curved arrow left',
    meaning: 'Curve in road to the left ahead. Reduce speed and stay in your lane.'
  },
  {
    id: 'sign-warn-005',
    name: 'Winding Road',
    type: 'warning',
    emoji: '🌀',
    description: 'Yellow diamond with S-curve',
    meaning: 'Series of curves ahead. Reduce speed and be prepared to turn.'
  },
  {
    id: 'sign-warn-006',
    name: 'Hill Ahead',
    type: 'warning',
    emoji: '⛰️',
    description: 'Yellow diamond with upward slope',
    meaning: 'Steep hill ahead. Reduce speed. Check brakes before descending.'
  },
  {
    id: 'sign-warn-007',
    name: 'Downhill Grade',
    type: 'warning',
    emoji: '📉',
    description: 'Yellow diamond with downward slope',
    meaning: 'Steep downhill grade ahead. Use low gear and check brakes.'
  },
  {
    id: 'sign-warn-008',
    name: 'Slippery Road',
    type: 'warning',
    emoji: '🌧️',
    description: 'Yellow diamond with skidding vehicle',
    meaning: 'Road surface is slippery when wet. Reduce speed and be cautious.'
  },
  {
    id: 'sign-warn-009',
    name: 'Loose Gravel',
    type: 'warning',
    emoji: '🪨',
    description: 'Yellow diamond with gravel symbol',
    meaning: 'Loose gravel on road ahead. Reduce speed. Traction may be poor.'
  },
  {
    id: 'sign-warn-010',
    name: 'Road Work Ahead',
    type: 'warning',
    emoji: '🚧',
    description: 'Orange and black diamond',
    meaning: 'Construction work ahead. Reduce speed. Watch for workers and equipment.'
  },
  {
    id: 'sign-warn-011',
    name: 'Uneven Road',
    type: 'warning',
    emoji: '⚠️',
    description: 'Yellow diamond with uneven road',
    meaning: 'Bumpy or uneven road ahead. Reduce speed to avoid damage.'
  },
  {
    id: 'sign-warn-012',
    name: 'Railroad Crossing Ahead',
    type: 'warning',
    emoji: '🚂',
    description: 'Yellow diamond with railroad crossing X',
    meaning: 'Railroad tracks cross ahead. Be prepared to stop. Listen for trains.'
  },
  {
    id: 'sign-warn-013',
    name: 'No Passing Zone Ahead',
    type: 'warning',
    emoji: '🚷',
    description: 'Yellow diamond',
    meaning: 'Upcoming section where passing is not allowed. Do not pass ahead.'
  },
  {
    id: 'sign-warn-014',
    name: 'Merge Ahead',
    type: 'warning',
    emoji: '🔀',
    description: 'Yellow diamond with merging arrows',
    meaning: 'Two lanes will merge into one. Adjust speed and change lanes if necessary.'
  },
  {
    id: 'sign-warn-015',
    name: 'Left Lane Ends',
    type: 'warning',
    emoji: '⬅️',
    description: 'Yellow diamond indicating lane closure',
    meaning: 'The left lane ends ahead. Move to the right lane.'
  },
  {
    id: 'sign-warn-016',
    name: 'Right Lane Ends',
    type: 'warning',
    emoji: '➡️',
    description: 'Yellow diamond indicating lane closure',
    meaning: 'The right lane ends ahead. Move to the left lane.'
  },
  {
    id: 'sign-warn-017',
    name: 'Low Clearance',
    type: 'warning',
    emoji: '📏',
    description: 'Yellow diamond with height limit',
    meaning: 'Overhead obstruction (bridge, tree, etc.). Tall vehicles may not fit.'
  },
  {
    id: 'sign-warn-018',
    name: 'Two Way Traffic',
    type: 'warning',
    emoji: '⬅️➡️',
    description: 'Yellow diamond with two arrows',
    meaning: 'Two-way traffic ahead. Left turns will be oncoming.'
  },
  {
    id: 'sign-warn-019',
    name: 'Divided Highway Ends',
    type: 'warning',
    emoji: '🔀',
    description: 'Yellow diamond with merged traffic',
    meaning: 'Divided highway is ending. You will meet oncoming traffic. Move to right lane.'
  },
  {
    id: 'sign-warn-020',
    name: 'Intersection Ahead',
    type: 'warning',
    emoji: '✚',
    description: 'Yellow diamond with cross',
    meaning: 'Intersection ahead. Slow down and be prepared to stop.'
  },
  {
    id: 'sign-warn-021',
    name: 'Bicycle Crossing',
    type: 'warning',
    emoji: '🚲',
    description: 'Yellow diamond with bicycle',
    meaning: 'Bicycles may cross or use this road. Be alert for cyclists.'
  },
  {
    id: 'sign-warn-022',
    name: 'Animal Crossing',
    type: 'warning',
    emoji: '🦌',
    description: 'Yellow diamond with animal silhouette',
    meaning: 'Wildlife may cross the road. Reduce speed and be alert.'
  },
  {
    id: 'sign-warn-023',
    name: 'Farm Equipment Crossing',
    type: 'warning',
    emoji: '🚜',
    description: 'Yellow diamond with farm equipment',
    meaning: 'Farm equipment may cross or use the road. Reduce speed.'
  },
  {
    id: 'sign-warn-024',
    name: 'Disabled Persons Crossing',
    type: 'warning',
    emoji: '♿',
    description: 'Yellow diamond with wheelchair',
    meaning: 'Persons with disabilities cross or live in this area. Be alert and reduce speed.'
  },
  {
    id: 'sign-warn-025',
    name: 'Elderly Persons Crossing',
    type: 'warning',
    emoji: '👴',
    description: 'Yellow diamond with elderly figures',
    meaning: 'Elderly persons may cross here. Reduce speed and be prepared to stop.'
  },
  {
    id: 'sign-warn-026',
    name: 'Playground Ahead',
    type: 'warning',
    emoji: '🎪',
    description: 'Yellow diamond with children playing',
    meaning: 'Playground nearby. Watch for children. Reduce speed.'
  },
  {
    id: 'sign-warn-027',
    name: 'Speed Hump Ahead',
    type: 'warning',
    emoji: '🚧',
    description: 'Yellow diamond with speed hump',
    meaning: 'Speed hump (bump) ahead. Reduce speed to avoid vehicle damage.'
  },
  {
    id: 'sign-warn-028',
    name: 'Slippery When Wet',
    type: 'warning',
    emoji: '💧',
    description: 'Yellow diamond with wet road symbol',
    meaning: 'Road becomes slippery in wet conditions. Reduce speed when wet.'
  },
  {
    id: 'sign-warn-029',
    name: 'Ramp Curves Right',
    type: 'warning',
    emoji: '🛣️',
    description: 'Yellow diamond with curved ramp',
    meaning: 'Exit or entrance ramp curves to the right. Reduce speed and follow curve.'
  },
  {
    id: 'sign-warn-030',
    name: 'Ramp Curves Left',
    type: 'warning',
    emoji: '🛣️',
    description: 'Yellow diamond with curved ramp',
    meaning: 'Exit or entrance ramp curves to the left. Reduce speed and follow curve.'
  },
  {
    id: 'sign-warn-031',
    name: 'Freeway Ends',
    type: 'warning',
    emoji: '🛣️',
    description: 'Yellow diamond',
    meaning: 'Freeway ends ahead. Be prepared for local traffic and traffic controls.'
  },
  {
    id: 'sign-warn-032',
    name: 'Truck Crossing',
    type: 'warning',
    emoji: '🚚',
    description: 'Yellow diamond with truck',
    meaning: 'Trucks may cross the road. Reduce speed and be alert.'
  },
  {
    id: 'sign-warn-033',
    name: 'Divided Highway Ahead',
    type: 'warning',
    emoji: '🔀',
    description: 'Yellow diamond with divided lanes',
    meaning: 'This road becomes a divided highway ahead. Oncoming traffic will be separated.'
  },
  {
    id: 'sign-warn-034',
    name: 'Right Turn Only',
    type: 'warning',
    emoji: '↗️',
    description: 'Yellow diamond with arrow',
    meaning: 'Right turn only allowed. Do not go straight or turn left.'
  },
  {
    id: 'sign-warn-035',
    name: 'Left Turn Only',
    type: 'warning',
    emoji: '↖️',
    description: 'Yellow diamond with arrow',
    meaning: 'Left turn only allowed. Do not go straight or turn right.'
  },
  {
    id: 'sign-warn-036',
    name: 'Keep Right',
    type: 'warning',
    emoji: '➡️',
    description: 'Yellow diamond with arrow pointing right',
    meaning: 'Keep to the right side of the road.'
  },
  {
    id: 'sign-warn-037',
    name: 'Keep Left',
    type: 'warning',
    emoji: '⬅️',
    description: 'Yellow diamond with arrow pointing left',
    meaning: 'Keep to the left side of the road.'
  },
  {
    id: 'sign-warn-038',
    name: 'Wrong Way Traffic',
    type: 'warning',
    emoji: '⚠️',
    description: 'Yellow diamond',
    meaning: 'Traffic coming toward you wrong way. Use caution and stop if necessary.'
  },
  {
    id: 'sign-warn-039',
    name: 'Stalled Vehicle',
    type: 'warning',
    emoji: '🚗',
    description: 'Yellow diamond',
    meaning: 'Stalled vehicle ahead. Be prepared to stop or change lanes.'
  },
  {
    id: 'sign-warn-040',
    name: 'Accident Ahead',
    type: 'warning',
    emoji: '⚠️',
    description: 'Yellow diamond',
    meaning: 'Accident ahead. Reduce speed and be prepared to stop.'
  },
  {
    id: 'sign-warn-041',
    name: 'Congestion Ahead',
    type: 'warning',
    emoji: '🚦',
    description: 'Yellow diamond',
    meaning: 'Traffic congestion ahead. Reduce speed and be prepared to stop.'
  },
  {
    id: 'sign-warn-042',
    name: 'Appearance of Danger',
    type: 'warning',
    emoji: '⚠️',
    description: 'Yellow diamond',
    meaning: 'A hazard or danger is present. Reduce speed and be cautious.'
  },
  {
    id: 'sign-warn-043',
    name: 'Bike Lane Ends',
    type: 'warning',
    emoji: '🚲',
    description: 'Yellow diamond',
    meaning: 'Bike lane ends ahead. Bicycles may merge with traffic.'
  },
  {
    id: 'sign-warn-044',
    name: 'Tidal Flow Lane',
    type: 'warning',
    emoji: '🔄',
    description: 'Yellow diamond',
    meaning: 'Lane direction changes. Check overhead signs for current direction.'
  },
  {
    id: 'sign-warn-045',
    name: 'Fog Likely',
    type: 'warning',
    emoji: '🌫️',
    description: 'Yellow diamond',
    meaning: 'Fog may occur in this area. Reduce speed and use headlights.'
  },
  {
    id: 'sign-warn-046',
    name: 'Side Road Ahead',
    type: 'warning',
    emoji: '➡️',
    description: 'Yellow diamond with side road',
    meaning: 'Side road enters ahead. Be alert for vehicles turning.'
  },
  {
    id: 'sign-warn-047',
    name: 'Playground Children Present',
    type: 'warning',
    emoji: '👶',
    description: 'Yellow diamond',
    meaning: 'Children playing. Reduce speed significantly.'
  },
  {
    id: 'sign-warn-048',
    name: 'Advisory Speed Below',
    type: 'warning',
    emoji: '📍',
    description: 'Yellow diamond below speed sign',
    meaning: 'Recommended speed for safe travel through this area.'
  },
  {
    id: 'sign-warn-049',
    name: 'Steep Hill Ahead',
    type: 'warning',
    emoji: '📉',
    description: 'Yellow diamond with steep slope',
    meaning: 'Steep grade ahead. Check brakes and use low gear.'
  },
  {
    id: 'sign-warn-050',
    name: 'Water Over Road',
    type: 'warning',
    emoji: '💧',
    description: 'Yellow diamond with water symbol',
    meaning: 'Water covers the road during heavy rain. Do not enter if water is over roadway.'
  },
  {
    id: 'sign-warn-051',
    name: 'Soft Shoulder',
    type: 'warning',
    emoji: '🛣️',
    description: 'Yellow diamond',
    meaning: 'Shoulder is soft or unpaved. Do not drive on shoulder.'
  },

  // Guide Signs (5)
  {
    id: 'sign-guide-001',
    name: 'Distance to City',
    type: 'guide',
    emoji: '🏙️',
    description: 'Green rectangular sign with city name and distance',
    meaning: 'Shows the distance in miles to the named city.'
  },
  {
    id: 'sign-guide-002',
    name: 'Highway Route Number',
    type: 'guide',
    emoji: '🛣️',
    description: 'Shield-shaped sign with route number',
    meaning: 'Indicates U.S. Route, State Route, or Interstate number.'
  },
  {
    id: 'sign-guide-003',
    name: 'Exit Sign',
    type: 'guide',
    emoji: '🚪',
    description: 'Green or blue rectangular sign',
    meaning: 'Shows the exit number and what is available at this exit.'
  },
  {
    id: 'sign-guide-004',
    name: 'Service Area',
    type: 'guide',
    emoji: '🔵',
    description: 'Blue rectangular sign with service symbols',
    meaning: 'Indicates gas, food, lodging, rest areas, or other services.'
  },
  {
    id: 'sign-guide-005',
    name: 'Rest Area',
    type: 'guide',
    emoji: '🛑',
    description: 'Blue rectangular sign',
    meaning: 'Rest area ahead. Stop to rest, eat, or use facilities.'
  },

  // Work Zone Signs (6)
  {
    id: 'sign-work-001',
    name: 'Construction Area',
    type: 'work-zone',
    emoji: '🚧',
    description: 'Orange and black diamond',
    meaning: 'Construction work ahead. Reduce speed, watch for workers and equipment.'
  },
  {
    id: 'sign-work-002',
    name: 'Lane Closure Ahead',
    type: 'work-zone',
    emoji: '🚧',
    description: 'Orange and black diamond with arrow',
    meaning: 'Lane will be closed. Merge to open lanes.'
  },
  {
    id: 'sign-work-003',
    name: 'Road Work Ahead',
    type: 'work-zone',
    emoji: '🚧',
    description: 'Orange and black diamond',
    meaning: 'Road work in progress. Reduce speed and follow directions.'
  },
  {
    id: 'sign-work-004',
    name: 'Falling Rocks',
    type: 'work-zone',
    emoji: '🪨',
    description: 'Orange and black diamond',
    meaning: 'Rocks may fall from cliffs. Watch for falling debris.'
  },
  {
    id: 'sign-work-005',
    name: 'Flagged Traffic',
    type: 'work-zone',
    emoji: '🚩',
    description: 'Orange sign',
    meaning: 'Traffic controlled by flaggers. Follow their directions.'
  },
  {
    id: 'sign-work-006',
    name: 'Pavement Ends',
    type: 'work-zone',
    emoji: '🛣️',
    description: 'Orange and black diamond',
    meaning: 'Paved road ends. Surface changes to gravel or dirt.'
  }
];
