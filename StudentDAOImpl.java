import java.sql.*;
import java.util.ArrayList;

public class StudentDAOImpl implements StudentDAO {

    Connection con = DBConnection.getConnection();

    @Override
    public void addStudent(Student s) {

        try {

            String sql = "insert into student values(?,?,?,?)";

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, s.getId());
            ps.setString(2, s.getName());
            ps.setString(3, s.getCourse());
            ps.setDouble(4, s.getMarks());

            int i = ps.executeUpdate();

            if(i>0)
                System.out.println("Student Added Successfully");

        } catch (Exception e) {
            System.out.println(e);
        }

    }

    @Override
    public void viewStudents() {

        ArrayList<Student> list = new ArrayList<>();

        try {

            Statement st = con.createStatement();

            ResultSet rs = st.executeQuery("select * from student");

            while(rs.next()){

                Student s = new Student();

                s.setId(rs.getInt(1));
                s.setName(rs.getString(2));
                s.setCourse(rs.getString(3));
                s.setMarks(rs.getDouble(4));

                list.add(s);

            }

            for(Student s:list){

                System.out.println("--------------------------------");

                System.out.println("ID : "+s.getId());
                System.out.println("Name : "+s.getName());
                System.out.println("Course : "+s.getCourse());
                System.out.println("Marks : "+s.getMarks());

            }

        } catch (Exception e) {
            System.out.println(e);
        }

    }

    @Override
    public void searchStudent(int id) {

        try {

            String sql="select * from student where id=?";

            PreparedStatement ps=con.prepareStatement(sql);

            ps.setInt(1,id);

            ResultSet rs=ps.executeQuery();

            if(rs.next()){

                System.out.println("ID : "+rs.getInt(1));
                System.out.println("Name : "+rs.getString(2));
                System.out.println("Course : "+rs.getString(3));
                System.out.println("Marks : "+rs.getDouble(4));

            }

            else{

                System.out.println("Student Not Found");

            }

        } catch (Exception e) {

            System.out.println(e);

        }

    }

    @Override
    public void updateStudent(Student s) {

        try {

            String sql="update student set name=?,course=?,marks=? where id=?";

            PreparedStatement ps=con.prepareStatement(sql);

            ps.setString(1,s.getName());
            ps.setString(2,s.getCourse());
            ps.setDouble(3,s.getMarks());
            ps.setInt(4,s.getId());

            int i=ps.executeUpdate();

            if(i>0)
                System.out.println("Student Updated Successfully");
            else
                System.out.println("Student Not Found");

        } catch (Exception e) {

            System.out.println(e);

        }

    }

    @Override
    public void deleteStudent(int id) {

        try {

            String sql="delete from student where id=?";

            PreparedStatement ps=con.prepareStatement(sql);

            ps.setInt(1,id);

            int i=ps.executeUpdate();

            if(i>0)
                System.out.println("Student Deleted Successfully");
            else
                System.out.println("Student Not Found");

        } catch (Exception e) {

            System.out.println(e);

        }

    }

}
