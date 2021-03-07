# AAGIL
Associação Paraense de Aggressive Inline
<div>
		<h2>Sobre</h2>
		<p>.</p>
	</div>

## This project was created from the archetype "wildfly-jakartaee-webapp-archetype".
#### JAX-RS
#### SPA

### Steps to installation:
#### Project:
<strong>Run</strong>: "mvn install"
<br/><br/>
#### Database:
Download and install PostgreSQL.<p>
<strong>Create</strong> a database 'aagil' with user and password 'postgres'<p>
<strong>Run</strong>: "mvn flyway:migrate"
<br/><br/>
	
#### Application Server:
Download and start a Wildfly 19 Application Server <p>
<strong>Run</strong>: "mvn wildfly:execute-commands"<p>
<strong>Run</strong>: "mvn wildfly:deploy"<p>
<br/>
To undeploy:<p>
<strong>Run</strong>: "mvn wildfly:undepoy"
