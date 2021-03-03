package course.list;
import java.util.ArrayList;

class Animal{
  public String species;
  public double weightKg;
  public double heightM;
  public boolean predator;

  public Animal(String species, double weightKg, double heightM, boolean predator){
    this.species = species;
    this.weightKg = weightKg;
    this.heightM = heightM;
    this.predator = predator;
  }

  public void domesticate(){
    this.predator = false;
  }
}

class Hunter{
  public String name;
  public int age;
  public double weightKg;
  public double heightM;
  public double strength;
  public double cageCubicMeters;

  public Hunter(String name, int age, double weightKg, double heightM, double strength, double cageCubicMeters){
    this.name = name;
    this.age = age;
    this.weightKg = weightKg;
    this.heightM = heightM;
    this.strength = strength;
    this.cageCubicMeters = cageCubicMeters;
  }

  public boolean canCaptureAnimal(Animal animal){
    if((this.strengthKg() >= animal.weightKg && this.cageCubicMeters >= animal.heightM)
    && !animal.predator) return true;
    else return false;
  }

  public void attemptToDomesticate(Animal animal){
    if(this.strengthKg() > animal.weightKg * 2) animal.domesticate();
  }

  public double strengthKg(){
    return this.weightKg * this.strength;
  }
}

class Main{
  public static void printHunter(Hunter hunter){
    System.out.println("The hunter's name is: " + hunter.name + ". This hunter can carry: " + hunter.strengthKg() + "kg and has a cage " + hunter.cageCubicMeters + " cubic meters wide");
  }

  public static void printAnimal(Animal animal){
    System.out.println("The animal species is: " + animal.species + ". It's weight is: " + animal.weightKg + "kg and its height is: " + animal.heightM + "m. " + ((animal.predator) ? "It is a predator!" : "It is a peaceful animal."));
  }

  public static Animal[] capturedAnimals(Hunter hunter, Animal[] animalList){
    ArrayList<Animal> capturedAnimalList = new ArrayList<Animal> ();
    for(int i = 0; i < animalList.length; i++){
      if(hunter.canCaptureAnimal(animalList[i])){
        capturedAnimalList.add(animalList[i]);
      }
    }
    return capturedAnimalList.toArray(new Animal[capturedAnimalList.size()]);
  }

  public static void printAnimals(Animal[] animalList){
    System.out.println("--Listing Animals--");

    for(int i = 0; i < animalList.length; i++){
      System.out.println(animalList[i].species);
    }
    System.out.println("-------------------");
  }

  public static void domesticateTheAnimals(Hunter hunter, Animal[] animalList){
    for(int i = 0; i < animalList.length; i++){
      hunter.attemptToDomesticate(animalList[i]);
    }
  }

  public static void main(String[] args){
    // 各動物
    Animal tiger1 = new Animal("Tiger", 290, 2.6, true);
    Animal tiger2 = new Animal("Tiger", 300, 2.3, true);
    Animal bear1 = new Animal("Bear", 250, 2.8, true);
    Animal snake1 = new Animal("Snake", 250, 12.8, true);
    Animal dog1 = new Animal("Dog", 90, 1.2, false);
    Animal cat1 = new Animal("Cat", 40, 0.5, false);
    Animal cow1 = new Animal("Cow", 1134, 1.5, false);

    // 各ハンター
    Hunter hunternator = new Hunter("Hunternator", 30, 124.73, 1.85, 15, 3);
    Hunter hunterChild = new Hunter("Hunter Child Of The Small Giants", 10, 50, 1.2, 0.6, 1);

    // 関数の呼び出し
    printHunter(hunternator);
    printAnimal(tiger1);

    Animal[] animals = new Animal[]{tiger1, tiger2, bear1, snake1, dog1, cat1, cow1};
    System.out.println("Animals in the wild: ");
    printAnimals(animals);

    System.out.println("Animals captured by: " + hunternator.name + "");
    printAnimals(capturedAnimals(hunternator, animals));

    System.out.println("Animals captured by: " + hunterChild.name + "");
    printAnimals(capturedAnimals(hunterChild, animals));

    domesticateTheAnimals(hunternator, animals);
    System.out.println("Animals captured by: " + hunternator.name + "");
    printAnimals(capturedAnimals(hunternator, animals));

    System.out.println("" + hunternator.name + " is ready to bring peace to the animal kingdom.");
  }
}