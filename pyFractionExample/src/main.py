'''
Created on 2011/1/15

@author: sodas / NTU CSIE Mobile & HCI Research Lab
'''
import Mathematical as CustomMath

print("Following is some code sample of python:")
print('')

# IF control
x=2
y=3
z=4
if x<z<y:
    print("Y > Z > X")
elif x<y<z:
    print("X < Y < Z")
else:
    print("unknown order")
print('')

# For loop
print("Print sum(1,10)")
sum=0
for i in range(1,11):
    sum+=i
print(sum)
print('')

# For loop
print("Print sum(10,12)")
sum=0
for i in range(10,13):
    sum+=i
print(sum)
print('')

# Memory
a = "str1"
b = "str1"
c = str("str1")
d = [1,2,3]
e = [1,2,3]
f = d
if a is b: print(1)
if a == b: print(2)
if a is c: print(3)
if a == c: print(4)
if d is e: print(5)
if d == e: print(6)
if d is f: print(7)
if d == f: print(8)
print('')

# String format
str = "iPod Touch"
#print("The 4th letter of \"{0}\" should be '{1}'".format(str, str[3])) # Works with python 2.7
print("%d/%d" % (1,2))
print('')

# String funny
vowel=""
consonant=""
str1 = "Adobe Illustrator"
for i in str1:
    if i == " ":
        continue
    if i in "AEIOUaeiou":
        vowel+= i+" "
    else:
        consonant+= i+" "
print("{0} has following vowels: {1}, and has following consonants: {2}".format(str1, vowel, consonant))
print('')

# Array join
list1 = ["apple", "orange"]
list2 = ["pineapple", "passion fruit"]
print("list1={0}".format(list1))
print("list2={0}".format(list2))
print("list1+list2={0}".format(list1+list2))
print("list1[1]=\"{0}\"".format(list1[1]))
print("")

# Key-Value dict
dict = {"name":"Peter", "age":23, "job":"Layout Designer"}
print(dict["job"])
print('')

a = CustomMath.Fraction(1,3)
b = CustomMath.Fraction(1,6)
print(CustomMath.__name__)
print("1/3 + 1/6 = {0}".format(a+b))
print("1/3 - 1/6 = {0}".format(a-b))
print("1/3 * 1/6 = {0}".format(a*b))
print("1/3={0}".format(a.getFloatValue()))

if a>=b:
    print("1/3 >= 1/6")
else:
    print("1/3 !>= 1/6")
print('')
