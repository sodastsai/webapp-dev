'''
Created on 2011/1/15

@author: sodas
'''
# You may reference http://docs.python.org/release/2.6.6/reference/datamodel.html#special-method-names
# for some object method check

# Some Util
def gcd(a,b):
    if b==0:
        return a
    else:
        return gcd(b, a%b)

class Fraction:
    # Member
    numerator=0
    denominator=1
    
    # Method
    # Constructor
    def __init__(self, n, d):
        self.numerator = n
        if d>0:
            self.denominator=d
        else:
            self.denominator=1
            
    # toString
    def __str__(self):
        if self.denominator==1:
            return "{0}".format(self.numerator)
        else:
            return "{0}/{1}".format(self.numerator, self.denominator)
    
    # get float value
    def getFloatValue(self):
        return float(self.numerator)/float(self.denominator)
    
    # Operators
    def __add__(self, other):
        result = Fraction(0,1)
        result.numerator = self.numerator*other.denominator+self.denominator*other.numerator
        result.denominator = self.denominator*other.denominator
        # Reduction
        factor = gcd(result.numerator, result.denominator)
        result.numerator /= factor
        result.denominator /= factor
        return result
    
    def __sub__(self, other):
        result = Fraction(0,1)
        result.numerator = self.numerator*other.denominator-self.denominator*other.numerator
        result.denominator = self.denominator*other.denominator
        # Reduction
        factor = gcd(result.numerator, result.denominator)
        result.numerator /= factor
        result.denominator /= factor
        return result
    
    def __mul__(self, other):
        result = Fraction(0,1)
        result.numerator = self.numerator * other.numerator
        result.denominator = self.denominator * other.denominator
        # Reduction
        factor = gcd(result.numerator, result.denominator)
        result.numerator /= factor
        result.denominator /= factor
        return result
    
    def __div__(self, other):
        result = Fraction(0,1)
        result.numerator = self.numerator * other.denominator
        result.denominator = self.denominator * other.numerator
        # Reduction
        factor = gcd(result.numerator, result.denominator)
        result.numerator /= factor
        result.denominator /= factor
        return result
    
    def __lt__(self, other):
        return self.numerator*other.denominator<self.denominator*other.numerator
    def __le__(self, other):
        return self.numerator*other.denominator<=self.denominator*other.numerator
    def __eq__(self, other):
        return self.numerator*other.denominator==self.denominator*other.numerator
    def __ge__(self, other):
        return self.numerator*other.denominator>=self.denominator*other.numerator
    def __gt__(self, other):
        return self.numerator*other.denominator>self.denominator*other.numerator
