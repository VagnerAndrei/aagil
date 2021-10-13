echo "Restaurando Standalone.xml..."
sudo cp standalone.xml /opt/wildfly-23.0.0.Final/standalone/configuration/standalone.xml
echo "Standalone.xml restaurado com sucesso!"
echo "..."
echo "Executando aagil.cli..."
sudo bash /opt/wildfly-23.0.0.Final/bin/jboss-cli.sh --connect --file=aagil.cli
echo "aagil.cli executado com sucesso!"