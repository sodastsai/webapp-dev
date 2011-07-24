package tw.edu.ntu.fraction;

public class Main {

	public static void main(String[] args) {
		Fraction a = new Fraction(1,3);
		Fraction b = new Fraction(1,6);

		System.out.println("1/3 + 1/6 = "+a.add(b).toString());
		System.out.println("1/3 - 1/6 = "+a.sub(b).toString());
		System.out.println("1/3 * 1/6 = "+a.mul(b).toString());
		System.out.println("1/3 / 1/6 = "+a.div(b).toString());
		System.out.println("1/3 = "+Float.toString(a.getFloatValue()));
		
		if (a.ge(b))
			System.out.println("1/3 >= 1/6");
		else
			System.out.println("1/3 !>= 1/6");
	}

}
