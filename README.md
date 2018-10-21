## Project: [Electron Sidescroller](https://github.com/wilsonjohnson/cs-499-final-game)

I began the creation of this project with the goal of creating a general game engine. Along the way I discovered that, due to time constraints this would not be a plausible endeavor in the amount of time I had for this class. However, I was able to create a basic interactive playground.

## Project: [MongoDB Java Integration ( JMongo )](https://github.com/wilsonjohnson/final-project-adv-programming-concepts)

The purpose of this project was initially as a final project for the advanced programming concepts course.

However, as I worked on it, I started realizing that I very much disliked the syntax for calling MongoDB queries from Java so I decided to work on an interface which improved this.

This is where the IDAO.java class comes in to play, When creating a MongoDB DAO, extending this object gives alot of flexibility when creating queries.

```java
public class StocksDAO implements IDAO {
  DBCollection collection;
  MongoClient client;
  public StocksDAO( MongoClient client ) throws NullPointerException {
        Objects.requireNonNull(client, "Client provided cannot be null");
    log = LoggerFactory.getLogger( this.getClass() );
    this.client = client;
    setupCollection();
  }

  /**
   * Init method to setup this DAO's collection
   */
  private void setupCollection(){
    collection = client.getDB( "market" ).getCollection( "stocks" );
  }

  @Override
  public DBCollection getCollection() {
    return collection;
  }
}
```

It attempts to utilize a fluent pattern when creating queries, and in most cases is much less verbose than the original Java.

```java
/**
 * Counts the averages within a specified range
 */
public int countAveragesFromTo( Double from, Double to ){
  return count( 
    queryWhere( "50-Day Simple Moving Average" )
      .greaterThan( from )
      .lessThan( to ).get() );
}
```

While the normal find, create, delete, and update functions are still not to my liking, I was able to drastically improve the appearance of the aggregate pipeline.

```java
/**
 * Lists the top 5 stocks based on arbitrarily selected criteria for a Company
 * performs the following mongodb aggregate query:
 * <pre>
 * aggregate([
 * 	{ $match: { "Company": company } },
 * 	{ $sort: { "Performance (Year)": -1 } },
 * 	{ $limit: 5 }
 * ])
 * </pre>
 */
public Stream< DBObject > readTopFiveByCompany( String company ) {
  return aggregate( pipeline(
              $match(object("Company", company)),
              $sort(pair("Performance (Year)", DESCENDING)),
              $limit(5)
    ) );
}
```
