int led = 7;
bool isOn = false;

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0){
    char readerFromNode;
    readerFromNode = (char) Serial.read();
    convertToState(readerFromNode);
  }
  delay(200);   
}

void convertToState(char chr) {
  switch(chr){
    case '0':
      digitalWrite(led, LOW);
      isOn = false;
      delay(100); 
      break;
    case '1':
      digitalWrite(led, HIGH);
      isOn = true;
      delay(100); 
      break;
    case '2':
      Serial.write(isOn);
      break;
    default:
      break;
  }
}
