import java.util.Scanner;

public class StudentManagement {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        StudentDAO dao = new StudentDAOImpl();

        while (true) {

            System.out.println("\n===== Student Management System =====");

            System.out.println("1.Add Student");
            System.out.println("2.View Students");
            System.out.println("3.Search Student");
            System.out.println("4.Update Student");
            System.out.println("5.Delete Student");
            System.out.println("6.Exit");

            System.out.print("Enter Choice : ");

            int choice = sc.nextInt();

            switch (choice) {

                case 1:

                    Student s = new Student();

                    System.out.print("Enter ID : ");
                    s.setId(sc.nextInt());

                    sc.nextLine();

                    System.out.print("Enter Name : ");
                    s.setName(sc.nextLine());

                    System.out.print("Enter Course : ");
                    s.setCourse(sc.nextLine());

                    System.out.print("Enter Marks : ");
                    s.setMarks(sc.nextDouble());

                    dao.addStudent(s);

                    break;

                case 2:

                    dao.viewStudents();

                    break;

                case 3:

                    System.out.print("Enter Student ID : ");

                    dao.searchStudent(sc.nextInt());

                    break;

                case 4:

                    Student st = new Student();

                    System.out.print("Enter ID : ");
                    st.setId(sc.nextInt());

                    sc.nextLine();

                    System.out.print("Enter New Name : ");
                    st.setName(sc.nextLine());

                    System.out.print("Enter New Course : ");
                    st.setCourse(sc.nextLine());

                    System.out.print("Enter New Marks : ");
                    st.setMarks(sc.nextDouble());

                    dao.updateStudent(st);

                    break;

                case 5:

                    System.out.print("Enter Student ID : ");

                    dao.deleteStudent(sc.nextInt());

                    break;

                case 6:

                    System.out.println("Thank You");

                    System.exit(0);

                default:

                    System.out.println("Invalid Choice");

            }

        }

    }

}

