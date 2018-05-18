package configuration

import (
	"fmt"
	"os"

	"github.com/spf13/viper"

	flag "github.com/spf13/pflag"
)

// Configuration stuct is used to populate the various fields used by apowine
type Configuration struct {
	ServerPort string

	MakeNewConnection   bool
	MongoDatabaseName   string
	MongoCollectionName string
	MongoURL            string
	DBSkipTLS           bool

	AuthorizedEmail      string
	AuthorizedGivenName  string
	AuthorizedFamilyName string

	UnauthorizedEmail      string
	UnsuthorizedGivenName  string
	UnauthorizedFamilyName string

	LogFormat string
	LogLevel  string
}

func usage() {
	flag.PrintDefaults()
	os.Exit(2)
}

// LoadConfiguration will load the configuration struct
func LoadConfiguration() (*Configuration, error) {
	flag.Usage = usage
	flag.String("ServerPort", "", "Server Port [Default: 3000]")
	flag.String("LogLevel", "", "Log level. Default to info (trace//debug//info//warn//error//fatal)")
	flag.String("LogFormat", "", "Log Format. Default to human")

	flag.String("MakeNewConnection", "", "To create new session every request [default: false]")
	flag.String("MongoDatabaseName", "", "Name of the database [default: drinksdb]")
	flag.String("MongoCollectionName", "", "Name of the collection in database [default: drinkscollection]")
	flag.String("MongoURL", "", "URI to connect to DB [default: 127.0.0.1:27017]")
	flag.Bool("DBSkipTLS", true, "Is valid TLS required for the DB server ? [default: true]")

	flag.String("AuthorizedEmail", "", "Email address to allow the user to manipulate drinks [default: aliceaporeto@gmail.com]")
	flag.String("AuthorizedGivenName", "", "Given name to allow the user to manipulate drinks [default: Alice]")
	flag.String("AuthorizedFamilyName", "", "Family name to allow the user to manipulate drinks [default: Aporeto]")

	flag.String("UnauthorizedEmail", "", "Email address to reject the user to manipulate drinks [default: bobaporeto@gmail.com]")
	flag.String("UnsuthorizedGivenName", "", "Given name to reject the user to manipulate drinks [default: Bob]")
	flag.String("UnauthorizedFamilyName", "", "Family name to reject the user to manipulate drinks [default: Aporeto]]")

	// Setting up default configuration
	viper.SetDefault("ServerPort", ":3000")
	viper.SetDefault("LogLevel", "info")
	viper.SetDefault("LogFormat", "human")

	viper.SetDefault("MakeNewConnection", true)
	viper.SetDefault("MongoDatabaseName", "drinksdb")
	viper.SetDefault("MongoCollectionName", "drinkscollection")
	viper.SetDefault("MongoURL", "127.0.0.1:27017")
	viper.SetDefault("DBSkipTLS", true)

	viper.SetDefault("AuthorizedEmail", "aliceaporeto@gmail.com")
	viper.SetDefault("AuthorizedGivenName", "Alice")
	viper.SetDefault("AuthorizedFamilyName", "Aporeto")

	viper.SetDefault("UnauthorizedEmail", "bobaporeto@gmail.com")
	viper.SetDefault("UnsuthorizedGivenName", "Bob")
	viper.SetDefault("UnauthorizedFamilyName", "Aporeto")

	// Binding ENV variables
	// Each config will be of format TRIREME_XYZ as env variable, where XYZ
	// is the upper case config.
	viper.SetEnvPrefix("APOWINE")
	viper.AutomaticEnv()

	// Binding CLI flags.
	flag.Parse()
	viper.BindPFlags(flag.CommandLine)

	var config Configuration

	err := viper.Unmarshal(&config)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling: %s", err)
	}

	return &config, nil
}
