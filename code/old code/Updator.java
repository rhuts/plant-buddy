//<<<<<<< HEAD

import java.sql.*;

public class Updator{

	// A connection to the database  
	Connection connection;
	  
	// Statement to run queries
	Statement sql;
	  
	// Prepared Statement
	PreparedStatement ps;
	  
	// Resultset for the query
	ResultSet rs;
	
	public Updator(){}

	//establish a connection to be used for this session. Returns true if connection is sucessful
	public boolean connectDB(String connection_name, String username, String password){
		try {
      		connection = DriverManager.getConnection(connection_name, username, password); 
    	} catch (SQLException e) {
 
      		System.out.println("Connection Failed! Check output console");
      		e.printStackTrace();
      		return false;
    	}

    	if (connection == null) {
      		System.out.println("Failed to make connection!");
      		return false;
    	}
    	return true;
	}

	  //Closes the connection. Returns true if closure was sucessful
	  public boolean disconnectDB(){

	    try {
	      if (connection != null)
	        connection.close();
	    	else{
	    		System.out.println("Connection is already closed!");
	    	}
	    }
	    catch(SQLException e) {
	    	System.out.println("Failed to close connection!");
	      return false;    
	    }
	    return true;
	  }

  	public boolean updateDB(int iteration, int moisture){

  		String sqlText;

	  	try {

	  		//Create a Statement for executing SQL queries
			sql = connection.createStatement(); 

			if (sql == null){
				System.out.println("Could not create statement.");
				return false;
			}

	  		System.out.println("Executing update...");

	        //sqlText = "INSERT INTO observed_data (iteration, moisture) VALUES(" + iteration + ", " + moisture + ");";
	        //sqlText = "INSERT INTO observed_data (iteration, moisture) VALUES (100, 100);";
	        sqlText = "UPDATE observed_data SET moisture=100 WHERE iteration=1;";

	        /* 
	        TODO: this throws a SQLException, which only occurs when
	        if a database access error occurs, 
	        this method is called on a closed Statement, 
	        the given SQL statement produces a ResultSet object, 
	        the method is called on a PreparedStatement or CallableStatement
	        */
			sql.executeUpdate(sqlText);

	        /*
	  		sqlText = "INSERT INTO observed_data (iteration, moisture) VALUES(?, ?);";
	  		ps = connection.prepareStatement(sqlText);
	  		ps.setInt(1, iteration);
	  		ps.setInt(2, moisture);

	  		System.out.println("Done preparing statement...");

	  		ps.executeUpdate();
	  		*/

	        
	        
	        System.out.println("Done executing update.");
	    }
	    catch (SQLException e) {
	    	System.out.println("Failed to update database!");
	      return false;
	    }
		return true;
  	}

  	public boolean printDB(){
  		String sqlText;
	  	try {
			sql = connection.createStatement(); 
	  		System.out.println("Executing query...");
	        sqlText = "SELECT * FROM observed_data;";
	        rs = sql.executeQuery(sqlText);

	        if (rs != null){
				while (rs.next()){
					System.out.println(rs.getInt("iteration") + " | " + rs.getInt(2) + "\n");
      			}
    		}

	        System.out.println("Done executing query.");
	    }
	    catch (SQLException e) {
	    	System.out.println("Failed to read database!");
	      return false;
	    }
		return true;
  	}
	public static void main(String[] args){
		
		//if(args.length == 0){

		//}
		
		int iteration = Integer.parseInt(args[0]);
		int moisture = Integer.parseInt(args[1]);
		Updator u = new Updator();
		u.connectDB("jdbc:postgresql://mcsdb.utm.utoronto.ca:5432/csc301app3", "csc301app3", "29lnclkmlkn2oi34nc,.g");
		u.updateDB(iteration, moisture);
		u.printDB();
		u.disconnectDB();

	}
}
/*=======

import java.sql.*;

public class Updator{

	// A connection to the database  
	Connection connection;
	  
	// Statement to run queries
	Statement sql;
	  
	// Prepared Statement
	PreparedStatement ps;
	  
	// Resultset for the query
	ResultSet rs;
	
	public Updator(){}

	//establish a connection to be used for this session. Returns true if connection is sucessful
	public boolean connectDB(String connection_name, String username, String password){
		try {
      		connection = DriverManager.getConnection(connection_name, username, password); 
    	} catch (SQLException e) {
 
      		System.out.println("Connection Failed! Check output console");
      		e.printStackTrace();
      		return false;
    	}

    	if (connection == null) {
      		System.out.println("Failed to make connection!");
      		return false;
    	}
    	return true;
	}

	  //Closes the connection. Returns true if closure was sucessful
	  public boolean disconnectDB(){

	    try {
	      if (connection != null)
	        connection.close();
	    	else{
	    		System.out.println("Connection is already closed!");
	    	}
	    }
	    catch(SQLException e) {
	    	System.out.println("Failed to close connection!");
	      return false;    
	    }
	    return true;
	  }

  	public boolean updateDB(int iteration, int moisture){

  		String sqlText;

	  	try {

	  		//Create a Statement for executing SQL queries
			sql = connection.createStatement(); 

			if (sql == null){
				System.out.println("Could not create statement.");
				return false;
			}

	  		System.out.println("Executing update...");

	        //sqlText = "INSERT INTO observed_data (iteration, moisture) VALUES(" + iteration + ", " + moisture + ");";
	        //sqlText = "INSERT INTO observed_data (iteration, moisture) VALUES (100, 100);";
	        sqlText = "UPDATE observed_data SET moisture=100 WHERE iteration=1;";

	        /* 
	        TODO: this throws a SQLException, which only occurs when
	        if a database access error occurs, 
	        this method is called on a closed Statement, 
	        the given SQL statement produces a ResultSet object, 
	        the method is called on a PreparedStatement or CallableStatement
	        */
			//sql.executeUpdate(sqlText);

	        /*
	  		sqlText = "INSERT INTO observed_data (iteration, moisture) VALUES(?, ?);";
	  		ps = connection.prepareStatement(sqlText);
	  		ps.setInt(1, iteration);
	  		ps.setInt(2, moisture);

	  		System.out.println("Done preparing statement...");

	  		ps.executeUpdate();
	  		*/

	        
/*	        
	        System.out.println("Done executing update.");
	    }
	    catch (SQLException e) {
	    	System.out.println("Failed to update database!");
	      return false;
	    }
		return true;
  	}

  	public boolean printDB(){
  		String sqlText;
	  	try {
			sql = connection.createStatement(); 
	  		System.out.println("Executing query...");
	        sqlText = "SELECT * FROM observed_data;";
	        rs = sql.executeQuery(sqlText);
	        System.out.println("Done executing query.");
	    }
	    catch (SQLException e) {
	    	System.out.println("Failed to read database!");
	      return false;
	    }
		return true;
  	}
	public static void main(String[] args){
		
		//if(args.length == 0){

		//}
		
		int iteration = Integer.parseInt(args[0]);
		int moisture = Integer.parseInt(args[1]);
		Updator u = new Updator();
		u.connectDB("jdbc:postgresql://mcsdb.utm.utoronto.ca:5432/csc301app3", "csc301app3", "29lnclkmlkn2oi34nc,.g");
		u.updateDB(iteration, moisture);
		u.printDB();
		u.disconnectDB();

	}
}
>>>>>>> 38a260e2d080034a2d12313ec04a43de00d2e379
*/
