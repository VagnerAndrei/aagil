
public class teste {

	public static void main(String[] args) {
		int altura = 3680;
		int largura = 2755;
		
		float percent2 = (float)1080/(float)altura;
		System.out.println(percent2);
		
		float larguraResult = largura*percent2; 
		System.out.println(larguraResult);
		System.out.println(Math.floor(1.5));
		System.out.println("1080x"+Math.round(larguraResult));

	}
//38.57143020629883
//38.57143
}
//0,29347825
