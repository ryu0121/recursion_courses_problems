//Pair Of Cards のルール
//二人のプレイヤーが5枚ずつのカードを配られる
//以下のルールにしたがって勝負
//1. 被りが一番多い数字で勝負する。被り枚数が多い方が勝利 ex) [1, 2, 3, 3, K], [10, 2, J, Q, K] -> 3の被りがある左プレイヤーが勝利
//2. 被り枚数が同じ場合はそのカードの数字が大き方が勝利 ex)[1, 2, 3, 3, K], [10, J, J, Q, K] -> 3の被りが2、Jの被りが2。被り枚数は同じ。この場合は大きい数字Jである右プレイヤーが勝利
//3. 最大の被り枚数もその数字も同じ場合は、2番目に被り枚数が多い数字で上記を繰り返す。それでも決まらなかったら3番目に被り枚数が多い数字で。 ex)[1, 3, 3, K, K], [10, J, J, K, K]
// -> 最大の被り枚数は2で同じ。さらにその数字がKで同じ。次に最大被り枚数を持つ3とJで勝負。枚数は同じだがJの方が大きいので右プレイヤーの勝利
//4. 決着がつかない場合はdraw

package course.trumpGame;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Arrays;


//トランプのカードクラス
class Card{
    String suit;
    String value;
    int intValue;

    public Card(String suit, String value, int intValue){
        this.suit = suit;
        this.value = value;
        this.intValue = intValue;
    }

    //カードのマーク、見た目の数字、数値を出力
    public void printCard(){
        System.out.println(this.suit + this.value + "[" + this.intValue + "]");
    }
}

//デッキ
class Deck{
    ArrayList<Card> deck;

    public Deck(){
        this.deck = generateDeck();
    }

    //トランプ用意
    public static ArrayList<Card> generateDeck(){
        ArrayList<Card> deck = new ArrayList<>(52);
        String[] suits = new String[]{"♠︎", "♦︎", "♣️", "❤︎"};
        String[] values = new String[]{"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};

        for(int i = 0; i < suits.length; i++){
            for(int j = 0; j < values.length; j++){
                deck.add(new Card(suits[i], values[j], j+1));
            }
        }
        return deck;
    }

    //シャッフル
    public void shuffleCards(){
        for(int i = this.deck.size() - 1; i >= 0; i--){
            int j = (int)Math.floor(Math.random() * (i+1));
            Card temp = this.deck.get(i);
            this.deck.set(i, this.deck.get(j));
            this.deck.set(j, temp);
        }
    }

    //カードを一枚ひく
    public Card drawCard(){
        return this.deck.remove(this.deck.size() - 1);
    }

    //デッキにある残りのカードをみる
    public void printDeck(){
        System.out.println("--Printing Cards--");
        for(int i = 0; i < deck.size(); i++){
            deck.get(i).printCard();
        }
    }
}

//ディーラークラス
//状態を持たないステートレスクラス
class Dealer{
    //ゲームを始める
    //1. デッキを用意する
    //2. シャッフルする
    //3. それぞれのプレイヤーに5枚のカードを配る
    public static ArrayList<ArrayList<Card>> startGame(){
        Deck deck = new Deck();
        deck.shuffleCards();
        ArrayList<ArrayList<Card>> table = new ArrayList<>();
        for(int i = 0; i < 2; i++){
            ArrayList<Card> playerHand = new ArrayList<>();
            System.out.println("Player" + (i + 1));
            for(int j = 0; j < 5; j++){
                Card drawnCard = deck.drawCard();
                playerHand.add(drawnCard);
                drawnCard.printCard();
            }
            table.add(playerHand);
        }
        return table;
    }

    //ゲームの勝利者を決める
    public static String checkWinner(ArrayList<ArrayList<Card>> table){
        HashMap<Integer, Integer> player1RankArr = playerRankArr(table.get(0));
        HashMap<Integer, Integer> player2RankArr = playerRankArr(table.get(1));
        int[] maxValueOfPlayer1 = maxValue(player1RankArr);
        int[] maxValueOfPlayer2 = maxValue(player2RankArr);
        System.out.println(Arrays.toString(maxValueOfPlayer1));
        System.out.println(Arrays.toString(maxValueOfPlayer2));

        if(maxValueOfPlayer1[0] > maxValueOfPlayer2[0]) return "player1";
        else if(maxValueOfPlayer1[0] < maxValueOfPlayer2[0]) return "player2";
        else if(maxValueOfPlayer1[1] > maxValueOfPlayer2[1]) return "player1";
        else if(maxValueOfPlayer1[1] < maxValueOfPlayer2[1]) return "player2";
        else return "draw";
    }

    //それぞれの大きさのカードが何枚ずつあるかがわかるハッシュを作成
    public static HashMap<Integer, Integer> playerRankArr(ArrayList<Card> playerHand){
        HashMap<Integer, Integer> rankHash = new HashMap<>();
        for(int i = 0; i < playerHand.size(); i++){
            if(!rankHash.containsKey(playerHand.get(i).intValue)) rankHash.put(playerHand.get(i).intValue, 1);
            else rankHash.replace(playerHand.get(i).intValue, rankHash.get(playerHand.get(i).intValue) + 1);
        }
        return rankHash;
    }

    //ゲームのルールに乗っ取ってプレイヤーの勝負カードを決める
    public static int[] maxValue(HashMap<Integer, Integer> cardsHash){
        int max = 0;
        int value = 0;
        for(Integer key : cardsHash.keySet()){
            if( (cardsHash.get(key) > max) || (cardsHash.get(key) == max && key > value) ){
                max = cardsHash.get(key);
                value = key;
            }
        }
        return new int[]{max, value}; //{勝負カードの枚数, 勝負カード}
    }
}

class Main{
    public static void main(String[] args){
        //ゲームスタート
        //勝者を決める
        ArrayList<ArrayList<Card>> table = Dealer.startGame();
        System.out.println(Dealer.checkWinner(table));
    }
}
