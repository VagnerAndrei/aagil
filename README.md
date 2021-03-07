# AAGIL
Associação Paraense de Aggressive Inline
<div>
		<h2>Sobre</h2>
		<p>.</p>
	</div>

## This project was created from the archetype "wildfly-jakartaee-webapp-archetype".
#### JAX-RS
#### SPA
<br/><br/>
## Steps to installation:
### Project:
<ul>
	<li><strong Run</strong>: "mvn install"</li>
</ul>
<br/><br/>

### Database:
<ul>
	<li>Download and install PostgreSQL.</li>
	<li><strong>Create</strong> a database 'aagil' with user and password 'postgres'</li>
	<li><strong>Run</strong>: "mvn flyway:migrate"</li>
</ul>
<br/><br/>
	
### Application Server:
<ul>
	<li>Download and start a Wildfly 19 Application Server</li>
	<li><strong>Run</strong>: "mvn wildfly:execute-commands"</li>
	<li><strong>Run</strong>: "mvn wildfly:deploy"</li>
</ul>

To undeploy:<p>
<ul>
	<li><strong>Run</strong>: "mvn wildfly:undepoy"</li>
</ul>
