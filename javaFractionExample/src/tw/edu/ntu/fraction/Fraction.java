package tw.edu.ntu.fraction;

import java.math.BigInteger;

public class Fraction {
	// Member
	public int numerator = 0;
	public int denominator = 1;
	
	// Util
	private int gcd(int a, int b) {
		BigInteger i = new BigInteger(Integer.toString(a));
		BigInteger j = new BigInteger(Integer.toString(b));
		return i.gcd(j).intValue();
	}
	
	// Constructor
	public Fraction(int numerator, int denominator) {
		super();
		this.numerator = numerator;
		this.denominator = denominator;
	}
	
	// toString
	@Override
	public String toString() {
		if (denominator==1)
			return Integer.toString(numerator);
		else
			return Integer.toString(numerator)+"/"+Integer.toString(denominator);
	}
	
	// get float value
	public float getFloatValue() {
		return (float)numerator/(float)denominator;
	}
	
	// Operator
	public Fraction add(Fraction b) {
		Fraction result = new Fraction(0,1);
		result.numerator = this.numerator*b.denominator + this.denominator*b.numerator;
		result.denominator = this.denominator*b.denominator;
		int factor = gcd(result.numerator, result.denominator);
		result.numerator /= factor;
		result.denominator /= factor;
		return result;
	}
	
	public Fraction sub(Fraction b) {
		Fraction result = new Fraction(0,1);
		result.numerator = this.numerator*b.denominator - this.denominator*b.numerator;
		result.denominator = this.denominator*b.denominator;
		int factor = gcd(result.numerator, result.denominator);
		result.numerator /= factor;
		result.denominator /= factor;
		return result;
	}
	
	public Fraction mul(Fraction b) {
		Fraction result = new Fraction(0,1);
		result.numerator = this.numerator*b.numerator;
		result.denominator = this.denominator*b.denominator;
		int factor = gcd(result.numerator, result.denominator);
		result.numerator /= factor;
		result.denominator /= factor;
		return result;
	}
	
	public Fraction div(Fraction b) {
		Fraction result = new Fraction(0,1);
		result.numerator = this.numerator*b.denominator;
		result.denominator = this.denominator*b.numerator;
		int factor = gcd(result.numerator, result.denominator);
		result.numerator /= factor;
		result.denominator /= factor;
		return result;
	}
	
	public boolean lt(Fraction b) {
		return this.numerator*b.denominator < b.numerator*this.denominator;
	}
	public boolean le(Fraction b) {
		return this.numerator*b.denominator <= b.numerator*this.denominator;
	}
	public boolean eq(Fraction b) {
		return this.numerator*b.denominator == b.numerator*this.denominator;
	}
	public boolean ge(Fraction b) {
		return this.numerator*b.denominator >= b.numerator*this.denominator;
	}
	public boolean gt(Fraction b) {
		return this.numerator*b.denominator > b.numerator*this.denominator;
	}
}
