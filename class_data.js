student_img_folder = "student_images/" ;

// To make changes to a class: edit this dict and change pictures in student_imgs
class_to_student = {
			"class1": ["apurva_shrivastava", "dhruvika_sahni", "eswar_a", "harris_thompson", "jacob_yang", "jayda_brown", "karla_casique", "leondra_fair", "maria_anderson", "taranjit_singh"],
			"class2": ["jason_richard", "kat_rutherford", "megan_smith"],
			"class3": ["bob_joe", "harry_williams", "jarred_brown", "sarah_peterson", "steve_robbie", "william_jordan", "ying_li"],
			"class4": ["kyra_francis", "peter_scrub", "wayne_richards"]
			}

student_to_img = {}

for (var key in class_to_student){
	var class_name = class_to_student[key];
	var class_list = class_to_student[class_name];
	for( i=0; i < class_list.length; i++){
		var student_name = class_list[i];
		var student_img = student_img_folder+class_name+"/"+student_name+".jpg";
		student_to_img[student_name] = student_img;
	}
}
